const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const router = express.Router()

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  })
  
// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error))

// Endpoints
router.get('/', (req, res) => res.render('index'))
router.get('/artist-search', (req, res) => {
    const artistName = req.query.artist
    spotifyApi
        .searchArtists(artistName)
        .then(data => {
            const artistResults = data.body.artists.items
            res.render('artist-search-results', {artists: artistResults})
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
    
})
router.get('/:id', (req, res) =>{
    const artistID = req.params.id
    spotifyApi.getArtistAlbums(artistID)
        .then(data => {            
            const albums = data.body.items
            res.render('albums', { albums })
        })
        .catch(err => console.log('Error showing the artist albums:', err))
})

router.get('/album/:id', (req, res) => {
    const albumID = req.params.id
    spotifyApi.getAlbumTracks(albumID)
        .then(data => {
            const tracks = data.body.items
            res.render('tracks', {tracks})
        })
        .catch(err => console.log('Error showing album tracks: ', err))
    
})


module.exports = router
