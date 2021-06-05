import React, {useState} from 'react'
import {useSelector} from 'react-redux'

import {AppWebDisplayMode, LoadingState} from '../../../../constants'
import {getProjectState} from '../../../../redux/selectors'
import DefaultLayout from '../../../layouts/DefaultLayout'
import ToolbarContainer from '../ToolbarContainer'
import ControlPanelContainer from '../ControlPanelContainer'
import ListPanelContainer from '../ListPanelContainer'
import DetailPanelContainer from '../DetailPanel'

export default function MainWebContainer({appController}) {
  const projectState = useSelector(getProjectState)
  const [displayMode, setDisplayMode] = useState(AppWebDisplayMode.DetailPanelOff)

  return (
    <DefaultLayout
      displayMode={displayMode}
      loading={projectState === LoadingState.Loading}
      toolbar={<ToolbarContainer appController={appController}/>}
      controlPanel={<ControlPanelContainer appController={appController}/>}
      listPanel={<ListPanelContainer appController={appController} setDisplayMode={setDisplayMode}/>}
      detailPanel={<DetailPanelContainer appController={appController}/>}
    />
  )
}
