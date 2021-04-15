import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'

import Toolbar from '../../modules/AppBar'
import SharePanelContainer from './SharePanelContainer'
import ExportPanelContainer from './ExportPanelContainer'

export default function ToolbarContainer({appController}) {
  const {t} = useTranslation('Toolbar')
  const [sharePanelOpen, setSharePanel] = useState(false)
  const [exportPanelOpen, setExportPanel] = useState(false)

  const importProject = async () => {
    await appController.importProject()
  }

  const showSharePanel = () => {
    setSharePanel(true)
  }

  const hideSharePanel = () => {
    setSharePanel(false)
  }

  const showExportPanel = () => {
    setExportPanel(true)
  }

  const hideExportPanel = () => {
    setExportPanel(false)
  }

  return (
    <>
      <Toolbar
        onShareButtonClick={showSharePanel}
        onExportButtonClick={showExportPanel}
        onImportButtonClick={importProject}
      />

      <SharePanelContainer appController={appController} open={sharePanelOpen} onClose={hideSharePanel}/>
      <ExportPanelContainer appController={appController} open={exportPanelOpen} onClose={hideExportPanel}/>
    </>
  )
}

ToolbarContainer.propTypes = {
  appController: PropTypes.object.isRequired,
}
