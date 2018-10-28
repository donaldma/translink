const axios = require('axios')
require('dotenv').config()

const apiEndpoint = 'http://api.translink.ca'
const transLinkKey = process.env.TRANSLINK_KEY

module.exports = {
  apiAxios: axios.create({ baseURL: apiEndpoint }),
  transLinkKey
}