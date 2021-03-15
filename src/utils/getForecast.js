const request = require('request')
const apikey = 'rnShxBWEgE48Dl1LVIF6uxEEPLw8FHST';
const getForecast = (key,callback)=>{
    const url = 'http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/'+key+'?apikey='+apikey
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to network',undefined)
        }
        else if(response.body.length===0){
            callback('unable to fetch data, try again later!',undefined)
        }
        else{
            callback(undefined,{Temperature : response.body[0].Temperature.Value+'F', Chance_of_Rain : response.body[0].PrecipitationProbability+'%'})
        }
    })
}
module.exports = getForecast