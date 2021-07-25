import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {useRouter} from 'next/router'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Toolbar as MuiToolbar} from '@material-ui/core'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import ShareIcon from '@material-ui/icons/Share'

import IconButton from '../../../elements/IconButton'
import useMobileMode from '../../../hooks/useMobileMode'
import Select from '../../../elements/Select'


const useStyles = makeStyles((theme) => ({
  select: {
    marginLeft: theme.spacing(3),
  },
}))

export default function Toolbar({onShareButtonClick, onExportButtonClick, onImportButtonClick}) {
  const classes = useStyles()
  const {t, i18n} = useTranslation()
  const mobileMode = useMobileMode()
  const router = useRouter()

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
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <MuiToolbar>

          <IconButton description={t('分享專案')} icon={ShareIcon} onClick={onShareButtonClick}/>
          {!mobileMode ? (
            <>
              <IconButton description={t('匯出專案')} icon={ArchiveIcon} onClick={onExportButtonClick}/>
              <IconButton description={t('匯入專案')} icon={UnarchiveIcon} onClick={onImportButtonClick}/>
            </>
          ) : null}

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
        </MuiToolbar>
      </Grid>
    </Grid>
  )
}

Toolbar.propTypes = {
  onShareButtonClick: PropTypes.func.isRequired,
  onExportButtonClick: PropTypes.func.isRequired,
  onImportButtonClick: PropTypes.func.isRequired,
}
