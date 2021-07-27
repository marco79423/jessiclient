import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'

import {changeConnectionUrl} from '../../../../redux/project'
import {getConnectionState, getConnectionUrl} from '../../../../redux/selectors'
import ConnectionPanel from '../../../modules/ControlPanel/mobile/ConnectionPanel'


export default function ConnectionPanelContainer({appController}) {
  const dispatch = useDispatch()
  const connectionState = useSelector(getConnectionState)
  const connectionUrl = useSelector(getConnectionUrl)

  const onConnect = async (url) => {
    await dispatch(changeConnectionUrl(url))
    await appController.connect(url)
  }

  const onDisconnect = async () => {
    await appController.disconnect()
  }

  return (
    <ConnectionPanel
      state={connectionState}
      url={connectionUrl}
      onConnect={onConnect}
      onDisconnect={onDisconnect}
    />
  )
}

ConnectionPanelContainer.propTypes = {
  appController: PropTypes.object.isRequired,
}
