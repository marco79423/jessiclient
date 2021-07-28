import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {useRouter} from 'next/router'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Toolbar as MuiToolbar} from '@material-ui/core'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import ShareIcon from '@material-ui/icons/Share'

import useMobileMode from '../../../hooks/useMobileMode'
import IconButton from '../../../elements/IconButton'
import Select from '../../../elements/Select'
import ShareDialog from '../../dialogs/ShareDialog'
import ExportDialog from '../../dialogs/ExportDialog'


const useStyles = makeStyles((theme) => ({
  select: {
    marginLeft: theme.spacing(3),
  },
}))

export default function Toolbar({
                                  shareLink,
                                  onGenerateShareLink,
                                  onClearShareLink,

                                  onExportProject,
                                  onImportProject
                                }) {
  const classes = useStyles()
  const {t, i18n} = useTranslation()
  const router = useRouter()
  const mobileMode = useMobileMode()
  const [shareDialogOpen, setShareDialog] = useState(false)
  const [exportDialogOpen, setExportDialog] = useState(false)

  // Share Project
  const onShareButtonClick = () => {
    setShareDialog(true)
  }

  const onCloseShareDialog = () => {
    onClearShareLink()
    setShareDialog(false)
  }

  // Export Project
  const onExportButtonClick = () => {
    setExportDialog(true)
  }

  const onCloseExportDialog = () => {
    setExportDialog(false)
  }

  const onExportProjectWrapped = ({filename, messageIncluded}) => {
    onExportProject({filename, messageIncluded})
    setExportDialog(false)
  }

  // Import Project
  const onImportButtonClick = () => {
    onImportProject()
  }

  // Locale
  const locales = [
    {
      label: 'English',
      language: 'en',
    },
    {
      label: '繁體中文',
      language: 'zh-TW',
    },
    {
      label: '简体中文',
      language: 'zh-CN',
    },
  ]

  const onLocaleChange = async (value) => {
    await router.replace('/', '/', {locale: value})
  }

  return (
    <>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <MuiToolbar>
            <IconButton description={t('分享專案')} icon={ShareIcon} onClick={onShareButtonClick}/>

            {!mobileMode ? <>
              <IconButton description={t('匯出專案')} icon={ArchiveIcon} onClick={onExportButtonClick}/>
              <IconButton description={t('匯入專案')} icon={UnarchiveIcon} onClick={onImportButtonClick}/>
              <Select
                className={classes.select}
                currentValue={i18n.language}
                selections={locales.map(locale => ({
                  key: locale.language,
                  label: locale.label,
                  value: locale.language,
                }))}
                onSelectionChange={onLocaleChange}
              />
            </> : null}
          </MuiToolbar>
        </Grid>
      </Grid>

      <ShareDialog
        open={shareDialogOpen}
        onClose={onCloseShareDialog}
        shareLink={shareLink}
        onGenerateShareLink={onGenerateShareLink}
      />

      <ExportDialog
        open={exportDialogOpen}
        onClose={onCloseExportDialog}
        onExportProject={onExportProjectWrapped}
      />
    </>
  )
}

Toolbar.propTypes = {
  shareLink: PropTypes.string,
  onGenerateShareLink: PropTypes.func.isRequired,
  onClearShareLink: PropTypes.func.isRequired,

  onExportProject: PropTypes.func.isRequired,
  onImportProject: PropTypes.func.isRequired,
}
