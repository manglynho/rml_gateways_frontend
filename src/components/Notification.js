import React from 'react'
import { connect } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = (props) => {
  if (props.notification === null) {
    return null
  }

  let alert_style = props.style
  if(alert_style === 'error'){
    alert_style = 'danger'
  }

  return (
    <Alert variant={alert_style}>
      {props.notification}
    </Alert>
  )
}

const mapStateToProps = (state) => {
  if(state.notification === null || state.notification.length  === 0){
    return { notification: null }
  }
  if ( state.notification.text === null ) {
    return { notification: null }
  }  else{
    return {
      notification: state.notification.text,
      style: state.notification.style
    }
  }
}


const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification