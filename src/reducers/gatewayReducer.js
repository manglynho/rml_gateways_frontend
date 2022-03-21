import gatewayService from '../services/gateways'
import { setNotification } from '../reducers/notificationReducer'

const gatewayReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_GATEWAY':
    return [...state, action.data]
  case 'INIT_GATEWAYS':
    return action.data
  case 'REMOVE_GATEWAY': {
    const id = action.data
    return state.filter(item => item.id !== id)
  }
  default:
    return state
  }
}

export const createGateway = content => {
  return async dispatch => {
    const newGateway = await gatewayService.create(content)
    dispatch({
      type: 'NEW_GATEWAY',
      data: newGateway,
    })
  }
}

export const initializeGateways = () => {
  return async dispatch => {
    const gateways = await gatewayService.getAll()
    dispatch({
      type: 'INIT_GATEWAYS',
      data: gateways,
    })
  }
}

export const removeGateway = (gateway) => {
  return async dispatch => {
    try {
      await gatewayService.remove(gateway.id)
      dispatch({
        type: 'REMOVE_GATEWAY',
        data: gateway.id,
      })
      dispatch(setNotification(`Removed ${gateway.name}`, 3000, 'success'))
    }catch (error) {
      if (error.response) {
        // Request made and server responded
        dispatch(setNotification(error.response.data.error, 3000, 'error'))
      }else{
        dispatch(setNotification(error.message, 3000, 'error'))
      }
    }
  }
}

export default gatewayReducer