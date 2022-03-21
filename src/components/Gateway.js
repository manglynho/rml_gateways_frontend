import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Gateway = ({ gateway, byeGateway }) => {
  const [advPanelVisible, setAdvPanelVisible] = useState(false)

  const gatewayStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBtnStyle ={
    color: 'white',
    backgroundColor: 'red',
    borderColor:'red',
    borderRadius: '10%'
  }

  const hideWhenVisible = { display: advPanelVisible ? 'none' : '' }
  const showWhenVisible = { display: advPanelVisible ? '' : 'none' }


  const advancedGatewayPanelButtons = () => {
    return (
      <span>
        <span style={hideWhenVisible}>
          <button onClick={() => setAdvPanelVisible(true)}>View</button>
        </span>
        <span style={showWhenVisible}>
          <button onClick={() => setAdvPanelVisible(false)}>Hide</button>
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
          <button className='removeBtn' style={removeBtnStyle} onClick={byeGateway}>Remove</button>
        </div>
      </div>
    )
  }

  return (
    <div className='gateway_element' style={gatewayStyle}>
      <div>
        <a href={`api/gateways/${gateway.id}`} rel='noreferrer' target='_blank'>{gateway.name}</a> {advancedGatewayPanelButtons()}
        {advancedGatewayPanel()}
      </div>
    </div>
  )}

Gateway.propTypes = {
  gateway: PropTypes.object.isRequired
}

export default Gateway