import React from 'react'

import {LoadingState} from '../../../../constants'
import DefaultLayout from './DefaultLayout'
import useMobileMode from '../../../hooks/useMobileMode'
import MobileLayout from './MobileLayout'

export default function Main({
                               projectState,
                               webDisplayMode,
                               mobileDisplayMode,
                               toolbar,
                               controlPanel,
                               listPanel,
                               detailPanel
                             }) {
  const mobileMode = useMobileMode()
  if (mobileMode) {
    return (
      <MobileLayout
        displayMode={mobileDisplayMode}
        loading={projectState === LoadingState.Loading}
        toolbar={toolbar}
        controlPanel={controlPanel}
        listPanel={listPanel}
        detailPanel={detailPanel}
      />
    )
  } else {
    return (
      <DefaultLayout
        displayMode={webDisplayMode}
        loading={projectState === LoadingState.Loading}
        toolbar={toolbar}
        controlPanel={controlPanel}
        listPanel={listPanel}
        detailPanel={detailPanel}
      />
    )
  }
}
