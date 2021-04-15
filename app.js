require('dotenv').config()

const hbs = require('hbs')

// Database
require('./configs/mongoose.config')

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()



// Configs
require('./configs/preformatter.config')(app)
require('./configs/middleware.config')(app)
require('./configs/views.configs')(app)
require('./configs/locals.config')(app)

// Routes index
require('./routes')(app)

//app.listen(3000, () => console.log("Server listening on port 3000"))


module.exports = app
