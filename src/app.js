const express = require('express')
const path = require('path')
const hbs = require('hbs')
const location = require('./utils/getLocation')
const forecast = require('./utils/getForecast')

const app = express()

const public  = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.use(express.static(public))
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name: 'Hritik'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.search){
        res.send({
            error: 'Provide search term.'
        })
    }
    else{
        const term = req.query.search
        location(term,(error,data)=>{
            if(error){
                res.send({
                    error:error
                })
            }
            else{
                forecast(data,(error,data)=>{
                    if(error){
                        res.send({
                            error
                        })
                    }
                    else{
                        res.send({
                            location:term,
                            forecast:data
                        })
                    }
                })
            }
        })
    }
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Hritik',
        phone:'6200726997'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Hritik'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:'Hritik',
        errorMessage:'Unable to find your search.'
    })
})
// app.get('',(req,res)=>{
//     res.send("Hello world")
// })


// app.get('/help',(req,res)=>{
//     res.send("ow can i help you!")
// })
app.listen(3000,()=>{
    console.log('server is up!')
}) 