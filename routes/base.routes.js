const express = require('express')
const router = express.Router()

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));


// Endpoints
router.get('/', (req, res) => res.render('index'))



// Route params


router.get('/artist-search', (req, res) => {
    res.render('artist-search-results', req.query)
    console.log('Estos son los datos:',req.query)
    
    spotifyApi
    .searchArtists(req.query.artist)
    .then(data => {
        console.log('Estos son los datos:',req.query.items)
        console.log('The received data from the API: ', data.body);
        // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
  })

  .catch(err => console.log('The error while searching artists occurred: ', err));
    
})



module.exports = router
