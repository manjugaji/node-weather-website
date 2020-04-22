const request = require('request');
const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c58f29055a6ff298a05a98cec73884c0&query=' + longitude + ',' + latitude + '&units=m';
    request({ url, json : true}, (error, {body}) => {
        if(error){
            callback('unable to connect to location services', undefined);
        } else if(body.error){
            callback('Unable to find location', undefined);
        } else {
            callback(undefined,  'it is currently ' + body.current.temperature +
                        ' degrees out. It feels like ' + body.current.feelslike +
                        ' degrees out. Humidity is ' + body.current.humidity);
        }
    })
}

module.exports = forecast;