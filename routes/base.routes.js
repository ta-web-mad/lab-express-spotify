const express = require('express')
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
router.get('/artist-search', (req, res) => {
    //res.render('artist-search-results', req.query)
    //res.send(req.query)

    spotifyApi
        .searchArtists(req.query.searchArtist)
        .then(data => {
            console.log('The received data from the API: ', data.body.artists.items);
            // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
            res.render('artist-search-results', {foundArtists: data.body.artists.items})
            //res.send(data.body.artists.items)
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
})

router.get('/albums/:artistId', (req, res) => {
    spotifyApi
    .getArtistAlbums(req.params.artistId)
    .then((data)=>{
        res.render('albums', {foundAlbums:data.body.items})
    })
        .catch(err => console.log('The error while searching artists occurred: ', err));
})




//router.get('/albums/:artistId/tracks', (req, res))



module.exports = router



