import React from 'react'
import {useSelector} from 'react-redux'

import {LoadingState} from '../../../../constants'
import {getProjectState, getSelectedMessageID} from '../../../../selectors'
import MobileLayout from '../../../layouts/MobileLayout'
import ToolbarContainer from '../../web/ToolbarContainer'
import ControlPanelContainer from '../../web/ControlPanelContainer'
import ListPanelContainer from '../../web/ListPanelContainer'
import DetailPanelContainer from '../../web/DetailPanel'

export default function MainMobileContainer({appController}) {
  const projectState = useSelector(getProjectState)
  const messageID = useSelector(getSelectedMessageID)

  return (
    <MobileLayout
      loading={projectState === LoadingState.Loading}
      detailOpen={messageID !== null}
      toolbar={<ToolbarContainer appController={appController}/>}
      controlPanel={<ControlPanelContainer appController={appController}/>}
      listPanel={<ListPanelContainer appController={appController}/>}
      detailPanel={<DetailPanelContainer appController={appController}/>}
    />
  )
}
