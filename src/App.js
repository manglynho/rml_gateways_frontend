import React, { useState, useEffect, useRef } from 'react'
import GatewayList from './components/GatewayList'
import GatewayForm from './components/GatewayForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import gatewayService from './services/gateways'

import { setNotification } from './reducers/notificationReducer'
import { initializeGateways } from './reducers/gatewayReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [gateways, setGateways] = useState([])

  const gatewayFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeGateways())
  },[dispatch])


  const addGateway = async (gatewayObject) => {
    try {
      const returnedGateway = await gatewayService
        .create(gatewayObject)
      dispatch(initializeGateways())
      setGateways(gateways.concat(returnedGateway))
      dispatch(setNotification(`A new gateway ${returnedGateway.name} added`, 3000, 'success'))
      gatewayFormRef.current.toggleVisibility()
      return true
    }catch(exception){
      dispatch(setNotification(exception.response.data.error, 3000,'error'))
      return false
    }
  }

  const gatewayForm = () => (
    <Togglable buttonLabel='New Gateway' buttonCancelLabel='Cancel' ref={gatewayFormRef}>
      <GatewayForm createGateway={addGateway} />
    </Togglable>
  )

  return (
    <div>
      <h2>Gateways App</h2>
      <Notification/>
      {gatewayForm(addGateway)}
      <hr/>
      <GatewayList/>
    </div>
  )
}
export default App