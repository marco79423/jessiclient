import React from 'react'
import {useSelector} from 'react-redux'

import {LoadingState} from '../../../../constants'
import {getProjectState} from '../../../../selectors'
import DefaultLayout from '../../../layouts/DefaultLayout'
import ToolbarContainer from '../ToolbarContainer'
import ControlPanelContainer from '../ControlPanelContainer'
import ListPanelContainer from '../ListPanelContainer'
import DetailPanelContainer from '../DetailPanel'

export default function MainWebContainer({appController}) {
  const projectState = useSelector(getProjectState)

  return (
    <DefaultLayout
      appController={appController}
      loading={projectState === LoadingState.Loading}
      toolbar={ToolbarContainer}
      controlPanel={ControlPanelContainer}
      listPanel={ListPanelContainer}
      detailPanel={DetailPanelContainer}
    />
  )
}
