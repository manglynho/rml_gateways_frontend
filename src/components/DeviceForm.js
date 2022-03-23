import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, FormCheck, Button, Row, Col } from 'react-bootstrap'


const DeviceForm = ( props ) => {

  const [deviceUid, setdeviceUid] = useState('')
  const [deviceVendor, setdeviceVendor] = useState('')
  const [deviceStatus , setdeviceStatus] = useState(true)
  const [deviceGateway , setdeviceGateway] = useState('')

  const handleDeviceUidChange = (event) => {
    setdeviceUid(event.target.value)
  }
  const handleDeviceVendorChange = (event) => {
    setdeviceVendor(event.target.value)
  }
  const handleDeviceStatusChange = (event) => {
    setdeviceStatus(event.target.checked)
  }

  const handleDeviceGatewayChange = (event) => {
    setdeviceGateway(event.target.value)
  }

  const addDevice = async (event) => {
    event.preventDefault()
    const result = await props.createDevice({
      uid: deviceUid,
      vendor: deviceVendor,
      status: deviceStatus,
      gateway:deviceGateway,
    })
    if(result){
      setdeviceUid('')
      setdeviceVendor('')
      setdeviceStatus(false)
      setdeviceGateway('')
    }
  }

  return (
    <Row>
      <Col xs={12}>
        <Form onSubmit={addDevice}>
          <Form.Group>
            <h4>Add a new Device</h4>
            <Row className="mb-3">
              <Form.Label column="sm" lg={3}>Uid:</Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  id='uid'
                  type="text"
                  name="uid"
                  value={deviceUid}
                  onChange={handleDeviceUidChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label column="sm" lg={3}>Vendor:</Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  id='vendor'
                  type="text"
                  name="vendor"
                  value={deviceVendor}
                  onChange={handleDeviceVendorChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label column="sm" lg={3}>Gateway:</Form.Label>
              <Col>
                <Form.Select size="sm" onChange={handleDeviceGatewayChange}>
                  <option value=''>Select a Gateway</option>
                  {
                    props.gateways.map(gateway =>
                      <option key={gateway.id} value={gateway.id}>{gateway.name} {gateway.serial} </option>
                    )
                  }
                </Form.Select>
              </Col>
            </Row>
            <FormCheck
              type="switch"
              id="status"
              label="Status"
              value={deviceStatus}
              onChange={handleDeviceStatusChange}
            />
            <Button className="mb-3" id='add-device-button' type="submit" variant="primary" size="sm">Save</Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )
}

/*DeviceForm.propTypes = {
  createDevice:PropTypes.func.isRequired
}*/

const mapStateToProps = (state) => {
  return {
    gateways: state.gateways
  }
}

const mapDispatchToProps = {  }

const ConnectedDeviceForm = connect(mapStateToProps,mapDispatchToProps)(DeviceForm)
export default ConnectedDeviceForm

