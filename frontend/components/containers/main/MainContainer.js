import React from 'react'
import {useSelector} from 'react-redux'

import {LoadingState} from '../../../constants'
import {getMobileDisplayMode, getProjectState, getWebDisplayMode} from '../../../redux/selectors'
import ToolbarContainer from '../header/ToolbarContainer'
import ControlPanelContainer from '../content/ControlPanelContainer'
import ListPanelContainer from '../content/ListPanelContainer'
import DetailPanelContainer from '../content/DetailPanelContainer'
import Main from '../../modules/main/Main/Main'

export default function MainContainer({appController}) {
  const webDisplayMode = useSelector(getWebDisplayMode)
  const mobileDisplayMode = useSelector(getMobileDisplayMode)
  const projectState = useSelector(getProjectState)

  return (
    <Main
      webDisplayMode={webDisplayMode}
      mobileDisplayMode={mobileDisplayMode}
      loading={projectState === LoadingState.Loading}
      toolbar={<ToolbarContainer appController={appController}/>}
      controlPanel={<ControlPanelContainer appController={appController}/>}
      listPanel={<ListPanelContainer appController={appController}/>}
      detailPanel={<DetailPanelContainer appController={appController}/>}
    />
  )
}
