import axios from 'axios'
import { GET_BUSES } from './actionTypes'
import Constants from '../config/Constants'

export function getBuses() {
  const request = axios.get(`/api/transLink`)

  return {
    type: GET_BUSES,
    payload: request
  }
}