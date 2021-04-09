import React from 'react'
import {useSelector} from 'react-redux'

import {LoadingState} from '../constants'
import {getProjectState, getSelectedMessageID} from '../selectors'
import DefaultLayout from './layouts/DefaultLayout'
import ToolbarContainer from './containers/ToolbarContainer'
import ControlPanelContainer from './containers/ControlPanelContainer'
import ListPanel from './containers/ListPanel'
import DetailPanel from './containers/DetailPanel'

export default function Application({appController}) {
  const projectState = useSelector(getProjectState)
  const messageID = useSelector(getSelectedMessageID)

  return (
    <DefaultLayout
      loading={projectState === LoadingState.Loading}
      detailOpen={messageID !== null}
      toolbar={<ToolbarContainer appController={appController}/>}
      controlPanel={<ControlPanelContainer appController={appController}/>}
      listPanel={<ListPanel appController={appController}/>}
      detailPanel={<DetailPanel appController={appController}/>}
    />
  )
}
