import React, {useState} from 'react'
import {useSelector} from 'react-redux'

import {LoadingState} from '../../../../constants'
import {getProjectState, getSelectedMessageID} from '../../../../redux/selectors'
import MobileLayout from '../../../layouts/MobileLayout'
import ToolbarContainer from '../ToolbarContainer'
import ControlPanelContainer from '../ControlPanelContainer'
import ListPanelContainer from '../ListPanelContainer'
import DetailPanelContainer from '../DetailPanel'

export default function MainMobileContainer({appController}) {
  const projectState = useSelector(getProjectState)

  return (
    <MobileLayout
      appController={appController}
      loading={projectState === LoadingState.Loading}
      toolbar={ToolbarContainer}
      controlPanel={ControlPanelContainer}
      listPanel={ListPanelContainer}
      detailPanel={DetailPanelContainer}
    />
  )
}
