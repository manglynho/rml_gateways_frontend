import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import gatewayReducer from './reducers/gatewayReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  gateways: gatewayReducer,
  notification: notificationReducer,
  //filter: filterReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)  )
)

export default store