import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button , Col, Card } from 'react-bootstrap'

const Gateway = ({ gateway, byeGateway }) => {
  const [advPanelVisible, setAdvPanelVisible] = useState(false)

  const hideWhenVisible = { display: advPanelVisible ? 'none' : '' }
  const showWhenVisible = { display: advPanelVisible ? '' : 'none' }


  const advancedGatewayPanelButtons = () => {
    return (
      <span>
        <span style={hideWhenVisible}>
          <Button onClick={() => setAdvPanelVisible(true)} variant="outline-secondary" type="button" size="sm">
            View
          </Button>
        </span>
        <span style={showWhenVisible}>
          <Button onClick={() => setAdvPanelVisible(false)} variant="outline-secondary" type="button" size="sm">
            Hide
          </Button>
        </span>
      </span>
    )
  }

  const advancedGatewayPanel = () => {
    return (
      <div>
        <div style={showWhenVisible} className='moreDataPanel'>
          <div>
            {gateway.serial}
          </div>
          <div>
            {gateway.ip_v4}
          </div>
          <Button className='removeBtn' onClick={byeGateway} variant="danger" type="button" size="sm">Remove</Button>
        </div>
      </div>
    )
  }

  return (
    <Col xs={3} className='gateway_element mb-3'>
      <Card>
        <Card.Body>
          <a href={`api/gateways/${gateway.id}`} rel='noreferrer' target='_blank'>{gateway.name}</a> {advancedGatewayPanelButtons()}
          {advancedGatewayPanel()}
        </Card.Body>
      </Card>
    </Col>
  )}

Gateway.propTypes = {
  gateway: PropTypes.object.isRequired
}

export default Gateway