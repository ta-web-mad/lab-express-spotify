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

router.get('/artist-search', (req, res) => {
    //res.render('artist-search', req.query);
    //res.send(req.query.artist);
    spotifyApi
        .searchArtists(req.query.artist)
        .then(data => {
            // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
            //data.body.artists.items)
            res.render('artist-search-results', { datos: data.body.artists.items })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
})

router.get('/albums/:artistId', (req, res, next) => {

    //res.send(req.params.artistId)

    spotifyApi.getArtistAlbums(req.params.artistId).then(
        data => {
            res.send(data.body.items);
        })
        .catch(err => console.error(err));
})



module.exports = router
