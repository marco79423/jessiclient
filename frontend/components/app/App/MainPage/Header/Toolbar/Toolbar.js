import React from 'react'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Toolbar as MuiToolbar} from '@material-ui/core'
import ShareIcon from '@material-ui/icons/Share'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'

import useMobileMode from '../../../../../hooks/useMobileMode'
import {useProject} from '../../../../../../features/project'
import IconButton from '../../../../../elements/IconButton'
import ShareDialog from './ShareDialog'
import ExportDialog from './ExportDialog'
import LocaleSelect from './LocaleSelect'


const useStyles = makeStyles((theme) => ({
  select: {
    marginLeft: theme.spacing(3),
  },
}))

export default function Toolbar() {
  const classes = useStyles()
  const {t} = useTranslation()
  const mobileMode = useMobileMode()
  const project = useProject()

  const [shareDialogOpen, setShareDialog] = React.useState(false)
  const [exportDialogOpen, setExportDialog] = React.useState(false)

  // Share Project
  const onShareButtonClick = () => {
    setShareDialog(true)
  }

  const onCloseShareDialog = () => {
    setShareDialog(false)
  }

  // Export Project
  const onExportButtonClick = () => {
    setExportDialog(true)
  }

  const onCloseExportDialog = () => {
    setExportDialog(false)
  }

  // Import Project
  const onImportButtonClick = async () => {
    await project.importProject()
  }

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <MuiToolbar>
            <IconButton description={t('分享專案')} icon={ShareIcon} onClick={onShareButtonClick}/>

            {!mobileMode ? <>
              <IconButton description={t('匯出專案')} icon={ArchiveIcon} onClick={onExportButtonClick}/>
              <IconButton description={t('匯入專案')} icon={UnarchiveIcon} onClick={onImportButtonClick}/>
              <LocaleSelect className={classes.select}/>
            </> : null}

          </MuiToolbar>
        </Grid>
      </Grid>

      <ShareDialog
        open={shareDialogOpen}
        onClose={onCloseShareDialog}
      />

      <ExportDialog
        open={exportDialogOpen}
        onClose={onCloseExportDialog}
      />
    </>
  )
}

