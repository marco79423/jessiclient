import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Toolbar from '../../../modules/AppBar/mobile/Toolbar'
import ShareDialogContainer from './ShareDialogContainer'

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
        shareProject={showSharePanel}
      />

      <ShareDialogContainer appController={appController} open={sharePanelOpen} onClose={hideSharePanel}/>
    </>
  )
}

ToolbarContainer.propTypes = {
  appController: PropTypes.object.isRequired,
}
