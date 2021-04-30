import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Link, Paper, Typography} from '@material-ui/core'

import {AppMobileDisplayMode} from '../../../../constants'
import Button from '../../../elements/Button'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.project.page.main.controlPanel.background,
    padding: theme.spacing(2),
    height: '100%',
  },
  controlBar: {
    textAlign: 'right',
  },
  connectionPanel: {
    marginTop: theme.spacing(2),
  },
  requestPanel: {
    marginTop: theme.spacing(2),
    flex: 1,
  },
  copyright: {
    margin: '16px auto 8px',
    color: theme.project.page.main.controlPanel.copyright.textColor,
  }
}))

export default function ControlPanel({setDisplayMode, connectionPanel, requestPanel}) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')

  const showListPanel = () => {
    setDisplayMode(AppMobileDisplayMode.ListPanel)
  }

  return (
    <Paper className={classes.root} elevation={1} square>
      <div className={classes.controlBar}>
        <Button onClick={showListPanel}>{t('展開訊息列表')}</Button>
      </div>
      <div className={classes.connectionPanel}>
        {connectionPanel}
      </div>
      <div className={classes.requestPanel}>
        {requestPanel}
      </div>
      <div className={classes.copyright}>
        <Typography variant="body2" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://marco79423.net/">兩大類</Link>{' '}
          {new Date().getFullYear()}
        </Typography>
      </div>
    </Paper>
  )
}

ControlPanel.propTypes = {
  connectionPanel: PropTypes.element.isRequired,
  requestPanel: PropTypes.element.isRequired,
}
