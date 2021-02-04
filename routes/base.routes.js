const express = require('express')
const router = express.Router()

const SpotifyWebApi = require('spotify-web-api-node');
const { render } = require('../app');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

    

// Endpoints
router.get('/', (req, res) => res.render('index'))

router.get("/artist-search", (req, res) => {
    const artist = req.query.artist
    spotifyApi
    .searchArtists(artist)
    .then(data => { console.log('The received data from the API: ', data.body.artists.items);
    // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    res.render("artist-search-result", { artist: data.body.artists.items } )
    
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));
})


module.exports = router
