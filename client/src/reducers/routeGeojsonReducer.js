import { GET_ROUTE_GEOJSON   } from '../actions/actionTypes'
import { toast } from 'react-toastify'

const INITIAL_STATE = null

const routeGeojsonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ROUTE_GEOJSON  :
      if (action.error) {
        toast.error(action.payload.message)
        return {
          error: action.payload.message
        }
      } else {
        return action.payload.data
      }

    default:
      return state
  }
}

export default routeGeojsonReducer