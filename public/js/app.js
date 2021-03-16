console.log('client side')

const form = document.querySelector('form')
const search = document.querySelector('input')
const errorMsg = document.querySelector('#err')
const msg = document.querySelector('#dat')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(search.value);
    const url = '/weather?search='+search.value
    errorMsg.textContent = 'Loading...'
    msg.textContent = ''
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                errorMsg.textContent = data.error
            }
            else{
                errorMsg.textContent = `Location : ${data.location}`
                msg.textContent = `Temperature : ${data.forecast.Temperature}
                Chance of Rain : ${data.forecast.Chance_of_Rain}`
            }
        })
    })
    form.reset();
})

