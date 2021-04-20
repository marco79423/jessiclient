import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Toolbar from '../../../modules/mobile/AppBar'
import SharePanelContainer from './SharePanelContainer'

export default function ToolbarContainer({appController}) {
  const [sharePanelOpen, setSharePanel] = useState(false)

  const showSharePanel = () => {
    setSharePanel(true)
  }

  const hideSharePanel = () => {
    setSharePanel(false)
  }

  return (
    <>
      <Toolbar
        onShareButtonClick={showSharePanel}
      />

      <SharePanelContainer appController={appController} open={sharePanelOpen} onClose={hideSharePanel}/>
    </>
  )
}

ToolbarContainer.propTypes = {
  appController: PropTypes.object.isRequired,
}
