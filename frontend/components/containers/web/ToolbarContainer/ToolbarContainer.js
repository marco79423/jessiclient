import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'

import Toolbar from '../../../modules/web/AppBar'
import ShareDialogContainer from '../../common/ShareDialogContainer'
import ExportDialogContainer from '../../common/ExportDialogContainer'

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

      <ShareDialogContainer appController={appController} open={sharePanelOpen} onClose={hideSharePanel}/>
      <ExportDialogContainer appController={appController} open={exportPanelOpen} onClose={hideExportPanel}/>
    </>
  )
}

ToolbarContainer.propTypes = {
  appController: PropTypes.object.isRequired,
}
