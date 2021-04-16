const express = require('express')
const app = require('../app')
const router = express.Router()

const SpotifyWebApi = require('spotify-web-api-node')
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

// Query strings
router.get('/artist-search', (req, res) => {
    console.log(req.query.artist)
    spotifyApi
    .searchArtists(req.query.artist)
    .then(data => {
    console.log('The received data from the API: ', data.body.artists.items )
    res.render('artist-search-results', { artist: data.body.artists.items })
    console.log(data.body.artists.items)
    })
    .catch(err => console.log('The error while searching artists occurred: ', err))
})

// Search albums
router.get('/albums/:id', (req, res) => {


spotifyApi.getArtistAlbums(req.params.id)
  .then(function(data) {
    // console.log('Artist albums', data.body.items);
    res.render('albums', { albums: data.body.items })
    // res.view('Artist albums')
  }, function(err) {
    console.error(err);
  });

  })



module.exports = router