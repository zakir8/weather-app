const request = require('request');

function getWeather(lat, long, callback) {
    console.log("Forecast API : ", process.env.FORECAST_TOKEN);
    encodedPart = encodeURIComponent(`${lat}` + ',' + `${long}`);
    encodedURL = `https://api.darksky.net/forecast/${process.env.FORECAST_TOKEN}/${encodedPart}`;
    request({
        url: encodedURL,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        } else {
            callback("Unable to fetch weather");
        }
    });
}

module.exports = {
    getWeather
}