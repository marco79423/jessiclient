import React from 'react'

import {AppMobileDisplayMode} from '../../../../constants'
import ConnectionPanelContainer from './ConnectionPanelContainer'
import RequestPanelContainer from './RequestPanelContainer'
import ControlPanel from '../../../modules/ControlPanel/mobile/ControlPanel'


export default function ControlPanelContainer({appController, setDisplayMode}) {

  const onShowListPanel = () => {
    setDisplayMode(AppMobileDisplayMode.ListPanel)
  }

  return (
    <ControlPanel
      connectionPanel={<ConnectionPanelContainer appController={appController}/>}
      requestPanel={<RequestPanelContainer appController={appController}/>}

      onShowListPanel={onShowListPanel}
    />
  )
}
