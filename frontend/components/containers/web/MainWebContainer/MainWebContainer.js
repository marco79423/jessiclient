import React from 'react'
import {useSelector} from 'react-redux'

import {LoadingState} from '../../../../constants'
import {getProjectState, getSelectedMessageID} from '../../../../selectors'
import DefaultLayout from '../../../layouts/DefaultLayout'
import ToolbarContainer from '../ToolbarContainer'
import ControlPanelContainer from '../ControlPanelContainer'
import ListPanelContainer from '../ListPanelContainer'
import DetailPanelContainer from '../DetailPanel'

export default function MainWebContainer({appController}) {
  const projectState = useSelector(getProjectState)
  const messageID = useSelector(getSelectedMessageID)

  return (
    <DefaultLayout
      loading={projectState === LoadingState.Loading}
      detailOpen={messageID !== null}
      toolbar={<ToolbarContainer appController={appController}/>}
      controlPanel={<ControlPanelContainer appController={appController}/>}
      listPanel={<ListPanelContainer appController={appController}/>}
      detailPanel={<DetailPanelContainer appController={appController}/>}
    />
  )
}
