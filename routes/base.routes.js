const express = require('express')
const router = express.Router()

//Spotify
const SpotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then(data => {
        console.log(data)
        spotifyApi.setAccessToken(data.body['access_token'])
    })
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

// Endpoints
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/artist-search', (req, res) => {
    spotifyApi
        .searchArtists( req.query.artist )
        .then(data => {
            console.log('The received data from the API: ', data.body.artists.items[0])
            res.render('artist-search-results', { artists: data.body.artists.items })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));

})

router.get('/albums/:artistId', (req, res) => {
    // console.log('Esto deberia ser el; id', req.params.artistId)
    spotifyApi
        .getArtistAlbums(req.params.artistId)
        .then(data => {
            console.log('The received data from the API 2: ', data.body.items)
            res.render('albums', { albums: data.body.items })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
})

router.get('/tracks/:albumId', (req, res) => {
    //console.log('Esto deberia ser el id del abum', req.params.albumId)
    spotifyApi
        .getAlbumTracks(req.params.albumId)
        .then(data => {
            console.log('The received data from the API 3: ', data.body.items)
            res.render('tracks', { tracks: data.body.items })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
})


module.exports = router