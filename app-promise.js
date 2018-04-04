const yargs = require('yargs');
const axios = require('axios');
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

var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_TOKEN}&address=${encodeURIComponent(argv.address)}`

axios.get(geocodeURL).then( (response) => {
    if (response.data.status === "ZERO_RESULTS") {
        throw new Error('Unable to find address to get the job done.');
    }
    
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;

    var encodedPart = encodeURIComponent(`${latitude}` + ',' + `${longitude}`);
    var weatherURL = `https://api.darksky.net/forecast/${process.env.FORECAST_TOKEN}/${encodedPart}`;
    console.log(response.data.results[0].formatted_address);
    axios.get(weatherURL).then( (response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`The current temperature is ${temperature}\u00B0F. It feels like ${apparentTemperature}\u00B0F.`);
    })
}).catch( (e) => {
    if (e.code === 'ENOTFOUND') {
        console.log("Unable to connect to API servers");
    } else if (e.code === 'ECONNREFUSED') {
        console.log("Not connected to Internet");
    } else {
        console.log(e.message);
    }
    // console.log(e);
});
