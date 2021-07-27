import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Toolbar from '../../../modules/AppBar/mobile/Toolbar'
import ShareDialogContainer from './ShareDialogContainer'

export default function ToolbarContainer({appController}) {
  const [shareDialogOpen, setShareDialog] = useState(false)

  const onShareProject = () => {
    setShareDialog(true)
  }

  const onCloseShareDialog = () => {
    setShareDialog(false)
  }

  return (
    <>
      <Toolbar
        onShareProject={onShareProject}
      />

      <ShareDialogContainer
        appController={appController}
        open={shareDialogOpen}
        onClose={onCloseShareDialog}
      />
    </>
  )
}

ToolbarContainer.propTypes = {
  appController: PropTypes.object.isRequired,
}
