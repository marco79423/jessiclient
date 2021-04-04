import React from 'react'
import {useSelector} from 'react-redux'

import {LoadingState} from '../constants'
import {getProjectState, getSelectedMessageID} from '../selectors'
import DefaultLayout from './layouts/DefaultLayout'
import Toolbar from './modules/Toolbar'
import ControlPanel from './modules/ControlPanel'
import ListPanel from './modules/ListPanel'
import DetailPanel from './modules/DetailPanel'

export default function Application({appController}) {
  const projectState = useSelector(getProjectState)
  const messageID = useSelector(getSelectedMessageID)

  return (
    <DefaultLayout
      loading={projectState === LoadingState.Loading}
      detailOpen={messageID !== null}
      toolbar={<Toolbar appController={appController}/>}
      controlPanel={<ControlPanel appController={appController}/>}
      listPanel={<ListPanel appController={appController}/>}
      detailPanel={<DetailPanel appController={appController}/>}
    />
  )
}
