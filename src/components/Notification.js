import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notification === null) {
    return null
  }

  return (
    <div className={props.style}>
      {props.notification}
    </div>
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