import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Toolbar from '../../../modules/AppBar/web/Toolbar'
import ShareDialogContainer from '../../common/ShareDialogContainer'
import ExportDialogContainer from '../../common/ExportDialogContainer'

export default function ToolbarContainer({appController}) {
  const [shareDialogOpen, setShareDialog] = useState(false)
  const [exportDialogOpen, setExportDialog] = useState(false)

  const onImportProject = async () => {
    await appController.importProject()
  }

  const onShareProject = () => {
    setShareDialog(true)
  }

  const onCloseShareDialog = () => {
    setShareDialog(false)
  }

  const onExportProject = () => {
    setExportDialog(true)
  }

  const onCloseExportDialog = () => {
    setExportDialog(false)
  }

  return (
    <>
      <Toolbar
        onShareProject={onShareProject}
        onExportProject={onExportProject}
        onImportProject={onImportProject}
      />

      <ShareDialogContainer appController={appController} open={shareDialogOpen} onClose={onCloseShareDialog}/>
      <ExportDialogContainer appController={appController} open={exportDialogOpen} onClose={onCloseExportDialog}/>
    </>
  )
}

ToolbarContainer.propTypes = {
  appController: PropTypes.object.isRequired,
}
