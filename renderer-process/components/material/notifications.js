import React from 'react'
import ReactMaterialUiNotifications from 'react-materialui-notifications'
import Message from 'material-ui/svg-icons/communication/message'
import {deepOrange500} from 'material-ui/styles/colors'

const showNotification = () => {
    ReactMaterialUiNotifications.showNotification({
      title: 'Title',
      additionalText: `Some message to be displayed`,
      icon: <Message />,
      iconBadgeColor: deepOrange500,
      overflowText: "joe@gmail.com",
    })
  }

export {showNotification};

export default props => {
    return <ReactMaterialUiNotifications
       desktop={true}
       transitionName={{
         leave: 'dummy',
         leaveActive: 'fadeOut',
         appear: 'dummy',
         appearActive: 'zoomInUp'
       }}
       transitionAppear={true}
       transitionLeave={true}/>
}