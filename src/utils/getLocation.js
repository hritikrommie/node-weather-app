const request = require("request");
const key = 'rnShxBWEgE48Dl1LVIF6uxEEPLw8FHST';

const getLocation = (address,callback)=>{
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey='+key+'&q='+encodeURIComponent(address);
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to network!',undefined)
        }else if(response.body.length===0){
            callback('Unable to find location, try again later!',undefined)
        }
        else{
            const data = response.body[0].Key
            callback(undefined,data)
        }
    })
}
module.exports = getLocation


