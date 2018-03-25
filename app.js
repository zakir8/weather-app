const yargs = require('yargs');
const request = require('request');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
require('dotenv').config(); //loads the keys from .env file in the parent folders

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    debugger;
    if (errorMessage) {
        console.log(errorMessage);
    } else if (results) {
        console.log(`Address: ${results.address}`)
        weather.getWeather(results.latitude, results.longitude, (error, response) => {
            debugger;
            if (error) {
                console.log(errorMessage);
            } else if (response) {
                console.log(`The current temperature is ${response.temperature}\u00B0F. It feels like ${response.apparentTemperature}\u00B0F.`);
            }
        });
    }
});
