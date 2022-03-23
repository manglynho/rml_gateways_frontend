import React from 'react'
import { connect } from 'react-redux'
import { removeGateway } from '../reducers/gatewayReducer'
import { setNotification } from '../reducers/notificationReducer'
import DataTable from 'react-data-table-component'
import Alert from 'react-bootstrap/Alert'
import Device from '../components/Device'
import { Container , Row } from 'react-bootstrap'

const DeviceComponent = ({ data }) => {
  if(data.devices.length === 0){
    return(
      <pre>{
        <Alert variant='warning'>
          {'No Devices'}
        </Alert>
      }</pre>
    )
  }else{
    return(
      <pre>
        <Container fluid="auto">
          <Row className="mb-3 mt-3">
            {
              data.devices.map(device =>
                <Device key={device.id} device={device}/>
              )
            }
          </Row>
        </Container>
      </pre>
    )
  }
}


const GatewayList = (props) => {
  const columns = [
    { id: 'name',
      name: 'Name',
      cell: (record) => {
        return(
          <a href={`/api/gateways/${record.id}`} target='_blank' rel="noreferrer">{record.name}</a>
        )},
      //selector: row => row.name,
    },
    { id: 'serial',
      name: 'Serial',
      selector: row => row.serial,
    },
    { id: 'ipv4',
      name: 'IPv4',
      selector: row => row.ip_v4,
    },
    { id: 'action',
      name: 'Actions',
      className: 'action',
      width: 100,
      align: 'left',
      sortable: false,
      cell: (record) => {
        return (
          <button
            className="btn btn-danger btn-sm removeBtn"
            onClick={() => {
              if (window.confirm(`Delete ${record.name} ?`)) {
                props.removeGateway(record)
              }
            }}
          >
            Remove
          </button>
        )
      },
    },
  ]
  return(
    <DataTable
      columns={columns}
      data={props.gateways}
      expandableRows
      expandableRowsComponent={DeviceComponent}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    gateways: state.gateways
  }
}

const mapDispatchToProps = {  removeGateway , setNotification }

//export default AnecdoteList
const ConnectedGatewayList = connect(mapStateToProps,mapDispatchToProps)(GatewayList)
export default ConnectedGatewayList