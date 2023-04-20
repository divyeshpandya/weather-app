const request = require('postman-request')
const chalk = require('chalk')


const forecast = (lat,long,callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=fd6e59a13e4e7f639d1fd3f1f1c8578f&query="+encodeURIComponent(lat)+','+encodeURIComponent(long)
    request({url, json:true} , (error,{body} = {}) => {
        if(error){
            callback('Unable to connect to weather service',undefined)
        } else if(body.success===false){
            callback('Bad input',undefined)
        } else{
            callback(undefined, {
                temp: body.current.temperature,
                feellike: body.current.feelslike,
                message: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast