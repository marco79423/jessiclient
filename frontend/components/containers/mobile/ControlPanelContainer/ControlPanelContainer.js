import React from 'react'

import ConnectionPanelContainer from './ConnectionPanelContainer'
import RequestPanelContainer from './RequestPanelContainer'
import ControlPanel from '../../../modules/mobile/ControlPanel/ControlPanel'


export default function ControlPanelContainer({appController, setDisplayMode}) {
  return (
    <ControlPanel
      setDisplayMode={setDisplayMode}
      connectionPanel={<ConnectionPanelContainer appController={appController}/>}
      requestPanel={<RequestPanelContainer appController={appController}/>}
    />
  )
}
