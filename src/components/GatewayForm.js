import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col } from 'react-bootstrap'

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
    <Row>
      <Col xs={3}>
        <Form onSubmit={addGateway}>
          <Form.Group>
            <h4>Add a new Gateway</h4>
            <Row className="mb-3">
              <Form.Label column="sm" lg={2}>Serial:</Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  id='serial'
                  type="text"
                  name="serial"
                  value={gatewaySerial}
                  onChange={handleGatewaySerialChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label column="sm" lg={2}>Name:</Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  id='name'
                  type="text"
                  name="name"
                  value={gatewayName}
                  onChange={handleGatewayNameChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label column="sm" lg={2}>IPv4:</Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  id='ip_v4'
                  type="text"
                  name="ip_v4"
                  value={gatewayIPv4}
                  onChange={handleGatewayIPv4Change}
                />
              </Col>
            </Row>
            <Button className="mb-3" id='add-gateway-button' type="submit" variant="primary" size="sm">Save</Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )
}

GatewayForm.propTypes = {
  createGateway:PropTypes.func.isRequired
}


export default GatewayForm