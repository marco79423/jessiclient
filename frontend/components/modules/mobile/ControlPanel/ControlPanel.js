import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Paper} from '@material-ui/core'

import {AppMobileDisplayMode} from '../../../../constants'
import Copyright from './Copyright'
import Button from '../../../elements/Button'
import {useTranslation} from 'next-i18next'


const useStyles = makeStyles((theme) => ({
  root: {
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
  },
  copyright: {
    margin: '16px auto'
  }
}))

export default function ControlPanel({setDisplayMode, connectionPanel, requestPanel}) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')

  return (
    <Paper className={classes.root} elevation={1} square>
      <div className={classes.controlBar}>
        <Button onClick={() => setDisplayMode(AppMobileDisplayMode.ListPanel)}>{t('展開訊息列表')}</Button>
      </div>
      <div className={classes.connectionPanel}>
        {connectionPanel}
      </div>
      <div className={classes.requestPanel}>
        {requestPanel}
      </div>
      <div className={classes.copyright}>
        <Copyright/>
      </div>
    </Paper>
  )
}

ControlPanel.propTypes = {
  connectionPanel: PropTypes.element.isRequired,
  requestPanel: PropTypes.element.isRequired,
}
