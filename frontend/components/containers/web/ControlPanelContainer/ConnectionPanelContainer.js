import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'

import {changeConnectionUrl} from '../../../../slices/project'
import {getConnectionState, getConnectionUrl} from '../../../../selectors'
import ConnectionPanel from '../../../modules/web/ControlPanel/ConnectionPanel'


export default function ConnectionPanelContainer({appController}) {
  const dispatch = useDispatch()
  const connectionState = useSelector(getConnectionState)
  const connectionUrl = useSelector(getConnectionUrl)

  const connect = async (url) => {
    await dispatch(changeConnectionUrl(url))
    await appController.connect(url)
  }

  const disconnect = async () => {
    await appController.disconnect()
  }

  return (
    <ConnectionPanel
      state={connectionState}
      url={connectionUrl}
      connect={connect}
      disconnect={disconnect}
    />
  )
}

ConnectionPanelContainer.propTypes = {
  appController: PropTypes.object.isRequired,
}
