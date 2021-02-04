const express = require('express')
const router = express.Router()


const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
})
spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error))

// Endpoints
router.get('/', (req, res) => res.render('index'))
router.get('/artist-search', (req, res) => {
    spotifyApi
        .searchArtists(req.query.artist)
        .then(data => {
            console.log('The received data from the API: ', data.body.artists.items[0].images[0].url);
            // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
            const artists = data.body.artists.items
            res.render('artist-search-results', {artists} )
        })
        .catch(err => console.log('The error while searching artists occurred: ', err))
})
router.get('/:name/albums/:artistId', (req, res) => {
    spotifyApi
      .getArtistAlbums(req.params.artistId)
        .then(data => {
            console.log('The received data from the API: ', data.body.items);
            // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
            const albums = data.body.items
            res.render('albums', { albums })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err))
})

router.get('/:name/tracks/:albumsId', (req, res) => {
 
    spotifyApi
        .getAlbumTracks(req.params.albumsId)
        .then(data => {
            console.log('The received data from the API: ', data.body.items);
            // // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
            const tracks = data.body.items
            res.render('tracks', { tracks })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err))
})

module.exports = router
