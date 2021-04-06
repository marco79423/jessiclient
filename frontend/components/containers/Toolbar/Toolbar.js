import React, {useState} from 'react'
import {Grid, Toolbar as MuiToolbar} from '@material-ui/core'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import ShareIcon from '@material-ui/icons/Share'
import IconButton from '../../elements/IconButton'
import SharePanel from './SharePanel'
import ExportPanel from './ExportPanel'
import {useTranslation} from 'next-i18next'
import PropTypes from 'prop-types'

export default function Toolbar({appController}) {
  const {t} = useTranslation('Toolbar')
  const [sharePanelOpen, setSharePanel] = useState(false)
  const [exportPanelOpen, setExportPanel] = useState(false)

  const onImportClicked = async () => {
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
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <MuiToolbar>
            <IconButton description={t('分享專案')} icon={ShareIcon} onClick={showSharePanel}/>
            <IconButton description={t('匯出專案')} icon={ArchiveIcon} onClick={showExportPanel}/>
            <IconButton description={t('匯入專案')} icon={UnarchiveIcon} onClick={onImportClicked}/>
          </MuiToolbar>
        </Grid>
      </Grid>

      <SharePanel appController={appController} open={sharePanelOpen} onClose={hideSharePanel}/>
      <ExportPanel appController={appController} open={exportPanelOpen} onClose={hideExportPanel}/>
    </>
  )
}

Toolbar.propTypes = {
  appController: PropTypes.object.isRequired,
}
