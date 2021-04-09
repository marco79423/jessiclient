import React from 'react'
import PropTypes from 'prop-types'

import ExportPanel from '../../modules/Toolbar/ExportPanel'


export default function ExportPanelContainer({appController, open, onClose}) {
  const exportProject = async ({filename, messageIncluded}) => {
    await appController.exportProject({filename, messageIncluded})
    onClose()
  }

  return (
    <ExportPanel
      open={open}
      onClose={onClose}
      exportProject={exportProject}
    />
  )
}

ExportPanelContainer.propTypes = {
  appController: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
