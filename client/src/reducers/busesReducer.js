import { GET_BUSES } from '../actions/actionTypes'
import { toast } from 'react-toastify'

const INITIAL_STATE = null

const busesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BUSES:
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

export default busesReducer