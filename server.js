const ENV = process.env.ENV || 'development'
const PORT = process.env.PORT || 3001
const express = require('express')
const path = require('path')
const app = express()
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const KMZGeoJSON = require('kmz-geojson')
const Constants = require('./config/Constants')
const Helpers = require('./config/Helpers')

setInterval(function () {
  axios.get('https://donaldma-translink.herokuapp.com/')
}, 300000);

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.get('/api/transLink', async (req, res) => {
  try {
    const response = await Constants.apiAxios.get(`/rttiapi/v1/buses?apikey=${Constants.transLinkKey}`)
    res.json(response.data)
  } catch (err) {
    res.status(err.response.status).send(err.response.data)
  }
})

app.get('/api/transLink/route/:id', async (req, res) => {
  try {
    const KMZUrl = `http://nb.translink.ca/geodata/${req.params.id}.kmz`
    const response = await Constants.apiAxios.get(`/rttiapi/v1/buses?apikey=${Constants.transLinkKey}&routeNo=${req.params.id}`)

    const latLngArray = response.data.map(x => [x.Latitude, x.Longitude])
    const latLngCenter = Helpers.getLatLngCenter(latLngArray)

    await KMZGeoJSON.toGeoJSON(KMZUrl, function (err, json) {
      res.json({
        geoJson: json,
        latitude: latLngCenter[0],
        longitude: latLngCenter[1]
      })
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({ Message: 'Error fetching route GeoJSON data' })
  }
})

app.use(function (err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')))
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

server.listen(PORT, () => {
  console.log('Server running on', PORT)
})