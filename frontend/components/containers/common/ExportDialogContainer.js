import React from 'react'
import PropTypes from 'prop-types'

import ExportDialog from '../../modules/common/ExportDialog'


export default function ExportDialogContainer({appController, open, onClose}) {
  const exportProject = async ({filename, messageIncluded}) => {
    await appController.exportProject({filename, messageIncluded})
    onClose()
  }

  return (
    <ExportDialog
      open={open}
      onClose={onClose}
      exportProject={exportProject}
    />
  )
}

ExportDialogContainer.propTypes = {
  appController: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
