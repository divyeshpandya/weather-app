const request = require('postman-request')

const geocode = (address, callback) =>{
    
    const url1 = "https://api.opencagedata.com/geocode/v1/json?q="+encodeURIComponent(address)+"&key=de53cc15b6f34d9987e9be1301f56092"
    request({url:url1, json: true},(error,{body} = {})=>{
        if(error){
            callback('Unable to connect with the geocoding services!!',undefined)
        } else if(body.status.message!=='OK'){
            callback('Bad Input provided!!',undefined)
        } else{
            callback(undefined, {
                longitude: body.results[0].geometry.lng,
                latitude: body.results[0].geometry.lat
            })
        }
    })
}

module.exports = geocode