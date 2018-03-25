const request = require('request');

// callback can take two arguments. 
//// The first argument for a error object
//// The second argument for a success object
function geocodeAddress(address, callback) {
    console.log("Google API key: ", process.env.GOOGLE_MAPS_TOKEN);
    debugger;
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_TOKEN}&address=${encodeURIComponent(address)}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to Google servers.")
        } else if (body.status === "ZERO_RESULTS") {
            callback("Unable to find the result");
        } else if (body.status === "OK") {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports = {
    geocodeAddress
};