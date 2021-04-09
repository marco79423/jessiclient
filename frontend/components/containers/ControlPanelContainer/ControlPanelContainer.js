import React from 'react'

import ConnectionPanelContainer from './ConnectionPanelContainer'
import RequestPanelContainer from './RequestPanelContainer'
import ControlPanel from '../../modules/ControlPanel/ControlPanel'


export default function ControlPanelContainer({appController}) {
  return (
    <ControlPanel
      connectionPanel={<ConnectionPanelContainer appController={appController}/>}
      requestPanel={<RequestPanelContainer appController={appController}/>}
    />
  )
}
