import { combineReducers } from 'redux'
import busesReducer from './busesReducer'
import routeGeojsonReducer from './routeGeojsonReducer'

export default combineReducers({
  busesReducer,
  routeGeojsonReducer
})