import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, Toolbar as MuiToolbar} from '@material-ui/core'
import ShareIcon from '@material-ui/icons/Share'

import IconButton from '../../../../elements/IconButton'

export default function Toolbar({onShareProject}) {
  const {t} = useTranslation()

  const onShareButtonClick = () => {
    onShareProject()
  }

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <MuiToolbar>
          <IconButton description={t('分享專案')} icon={ShareIcon} onClick={onShareButtonClick}/>
        </MuiToolbar>
      </Grid>
    </Grid>
  )
}

Toolbar.propTypes = {
  onShareProject: PropTypes.func.isRequired,
}
