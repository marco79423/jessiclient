import React, {useState} from 'react'
import {useSelector} from 'react-redux'

import {AppWebDisplayMode, LoadingState} from '../../../../constants'
import {getProjectState} from '../../../../redux/selectors'
import MobileLayout from '../../../layouts/MobileLayout'
import ToolbarContainer from '../ToolbarContainer'
import ControlPanelContainer from '../ControlPanelContainer'
import ListPanelContainer from '../ListPanelContainer'
import DetailPanelContainer from '../DetailPanel'

export default function MainMobileContainer({appController}) {
  const projectState = useSelector(getProjectState)
  const [displayMode, setDisplayMode] = useState(AppWebDisplayMode.DetailPanelOff)

  return (
    <MobileLayout
      displayMode={displayMode}
      loading={projectState === LoadingState.Loading}
      toolbar={<ToolbarContainer appController={appController}/>}
      controlPanel={<ControlPanelContainer appController={appController} setDisplayMode={setDisplayMode}/>}
      listPanel={<ListPanelContainer appController={appController} setDisplayMode={setDisplayMode}/>}
      detailPanel={<DetailPanelContainer appController={appController} setDisplayMode={setDisplayMode}/>}
    />
  )
}
