import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, Toolbar as MuiToolbar} from '@material-ui/core'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import ShareIcon from '@material-ui/icons/Share'

import IconButton from '../../elements/IconButton'
import useMobileMode from '../../hooks/useMobileMode'

export default function Toolbar({onShareButtonClick, onExportButtonClick, onImportButtonClick}) {
  const {t} = useTranslation('Toolbar')
  const mobileMode = useMobileMode()

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
