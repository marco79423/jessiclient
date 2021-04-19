import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Paper} from '@material-ui/core'

import Copyright from '../../modules/ControlPanel/Copyright'
import useMobileMode from '../../hooks/useMobileMode'


const useStyles = makeStyles((theme) => ({
  root: ({mobileMode}) => ({
    background: theme.project.page.main.controlPanel.background,
    padding: mobileMode ? theme.spacing(2) : theme.spacing(3),
    height: '100%',
  }),
  connectionPanel: ({mobileMode}) => ({
    marginTop: mobileMode ? theme.spacing(0) : theme.spacing(3),
  }),
  requestPanel:  ({mobileMode}) => ({
    marginTop: mobileMode ? theme.spacing(2) : theme.spacing(4),
  }),
  copyright: {
    margin: '16px auto'
  }
}))

export default function ControlPanel({connectionPanel, requestPanel}) {
  const mobileMode = useMobileMode()
  const classes = useStyles({mobileMode})

  return (
    <Paper className={classes.root} elevation={1} square>
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
