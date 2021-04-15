const express = require('express')
const router = express.Router()
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


// Endpoints
router.get('/', (req, res) => res.render('index'))

//Routes for the lab:
router.get('/artist-search', (req, res, next) => {
    spotifyApi
        .searchArtists(req.query.artist)
        .then(data => {
            // console.log('The received data from the API: ', data.body.artists.items[0].images[0].url);
            // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
            res.render('artist-search-results', { artists: data.body.artists.items })

        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
})

router.get('/albums/:id', (req, res) => {

    const { id } = req.params
    spotifyApi
        .getArtistAlbums(id)
        .then(data => {
            console.log(data.body);
        })
})



module.exports = router
