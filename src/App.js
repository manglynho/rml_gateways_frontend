import React, { useState, useEffect, useRef } from 'react'
import GatewayList from './components/GatewayList'
import GatewayForm from './components/GatewayForm'
import DeviceForm from './components/DeviceForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import gatewayService from './services/gateways'
import deviceService from './services/devices'
import {  Row, Col } from 'react-bootstrap'

import { setNotification } from './reducers/notificationReducer'
import { initializeGateways } from './reducers/gatewayReducer'
import { useDispatch } from 'react-redux'

import Container from 'react-bootstrap/Container'

const App = () => {
  const [gateways, setGateways] = useState([])

  const gatewayFormRef = useRef()
  const deviceFormRef = useRef()

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

  const addDevice = async (deviceObject) => {
    try {
      const returnedDevice = await deviceService
        .create(deviceObject)
      dispatch(initializeGateways())
      dispatch(setNotification(`A new device ${returnedDevice.uid} added`, 3000, 'success'))
      deviceFormRef.current.toggleVisibility()
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

  const deviceForm = () => {
    return(
      <Togglable buttonLabel='New Device' buttonCancelLabel='Cancel' ref={deviceFormRef}>
        <DeviceForm createDevice={addDevice} />
      </Togglable>
    )}

  return (
    <Container>
      <h2>Gateways App</h2>
      <Notification/>
      <Row>
        <Col md={4}>{gatewayForm(addGateway)}</Col>
        <Col md={4}>{deviceForm(addDevice)}</Col>
      </Row>
      <hr/>
      <GatewayList/>
    </Container>
  )
}
export default App