import axios from 'axios'

const mapboxToken = 'pk.eyJ1IjoiZG9uYWxkbWEiLCJhIjoiY2puczI0b2NlMDZ4OTN3bndwY3F1MXltcyJ9.t3R_2uXhFCx7jm944B5xjg'
const apiEndpoint = process.env.NODE_ENV === 'production' ? 'https://donaldma-translink.herokuapp.com' : 'http://localhost:3001'

export default {
  apiAxios: axios.create({ baseURL: apiEndpoint }),
  mapboxToken
}