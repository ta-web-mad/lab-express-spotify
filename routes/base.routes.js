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

router.get('/artist-search', (req, res) =>  {
console.log(req.query)
    spotifyApi
        .searchArtists(req.query.artist)
        .then(data => {console.log('The received data from the API: ', data.body);
        const allArtists= data.body.artists.items
        res.render('artist-results', {allArtists})
            console.log(data.body.artists.items)
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
    
})

router.get('/albums/:artistId', (req, res) => {
    const { artistId } = req.params
    spotifyApi
        .getArtistAlbums(artistId) 
        .then(data => {
            console.log('The received data from the API: ', data.body);
            const allAlbums = data.body.items
            res.render('albums', { allAlbums })
            console.log(data.body.items)
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
});
   
module.exports = router
