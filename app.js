require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()
const SpotifyWebApi = require('spotify-web-api-node');

//Spotify

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});
// Retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .then()
    .catch(error => console.log('Something went wrong when retrieving an access token', error));


// Configs
require('./configs/preformatter.config')(app)
require('./configs/middleware.config')(app)
require('./configs/views.configs')(app)
require('./configs/locals.config')(app)
// Routes index
require('./routes')(app)

//Routes for the lab:
app.get('/artist-search?artist=:artist', (req, res, next) => {
    spotifyApi.searchArtists({ 'artist': req.params.artist })
    console.log(req.params);
    // spotifyApi
    //     .searchArtists('Metallica')
    //     .then(data => {
    //         console.log('The received data from the API: ', data.body);
    //         // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    //     })
    //     .catch(err => console.log('The error while searching artists occurred: ', err));

}
)

module.exports = app
