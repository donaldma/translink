import axios from 'axios'
import { GET_BUSES, GET_ROUTE_GEOJSON } from './actionTypes'

export function getBuses() {
  const request = axios.get(`/api/transLink`)

  return {
    type: GET_BUSES,
    payload: request
  }
}

export function getRouteGeoJSON(routeId) {
  const request = axios.get(`/api/transLink/route/${routeId}`)

  return {
    type: GET_ROUTE_GEOJSON,
    payload: request
  }
}