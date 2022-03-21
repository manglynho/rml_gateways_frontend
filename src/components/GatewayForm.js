import React, { useState } from 'react'
import PropTypes from 'prop-types'

const GatewayForm = ({ createGateway }) => {
  const [gatewaySerial, setgatewaySerial] = useState('')
  const [gatewayName, setgatewayName] = useState('')
  const [gatewayIPv4 , setgatewayIPv4] = useState('')

  const handleGatewaySerialChange = (event) => {
    setgatewaySerial(event.target.value)
  }
  const handleGatewayNameChange = (event) => {
    setgatewayName(event.target.value)
  }
  const handleGatewayIPv4Change = (event) => {
    setgatewayIPv4(event.target.value)
  }
  const addGateway = async (event) => {
    event.preventDefault()
    const result = await createGateway({
      serial: gatewaySerial,
      name: gatewayName,
      ip_v4: gatewayIPv4,
    })
    if(result){
      setgatewaySerial('')
      setgatewayName('')
      setgatewayIPv4('')
    }
  }

  return (
    <form onSubmit={addGateway}>
      <h3>Add a new Gateway</h3>
      <div>
          Serial:<input id='serial' value={gatewaySerial} onChange={handleGatewaySerialChange} />
      </div>
      <div>
          Name:<input id='name' value={gatewayName} onChange={handleGatewayNameChange} />
      </div>
      <div>
          IPv4:<input id='ip_v4' value={gatewayIPv4} onChange={handleGatewayIPv4Change} />
      </div>
      <button id='add-gateway-button' type="submit">Save</button>
    </form>
  )
}

GatewayForm.propTypes = {
  createGateway:PropTypes.func.isRequired
}


export default GatewayForm