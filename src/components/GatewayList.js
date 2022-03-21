import React from 'react'
import { connect } from 'react-redux'
import { removeGateway } from '../reducers/gatewayReducer'
import { setNotification } from '../reducers/notificationReducer'
import Gateway from '../components/Gateway'

const GatewayList = (props) => {
  return(
    <div>
      {props.gateways.map(gateway =>
        <Gateway
          key={gateway.id}
          gateway={gateway}
          byeGateway ={ () => {
            if (window.confirm(`Delete ${gateway.name} ?`)) {
              props.removeGateway(gateway)
            }
          }
          }
        />
      )}
    </div>
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