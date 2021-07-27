import React from 'react'
import PropTypes from 'prop-types'

import ExportDialog from '../../modules/AppBar/shared/ExportDialog/ExportDialog'


export default function ExportDialogContainer({appController, open, onClose}) {

  const onExportProject = async ({filename, messageIncluded}) => {
    await appController.exportProject({filename, messageIncluded})
    onClose()
  }

  return (
    <ExportDialog
      open={open}
      onClose={onClose}
      onExportProject={onExportProject}
    />
  )
}

ExportDialogContainer.propTypes = {
  appController: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
