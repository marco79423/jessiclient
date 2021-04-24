import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Link, Paper, Typography} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.project.page.main.controlPanel.background,
    padding: theme.spacing(3),
    height: '100%',
  },
  connectionPanel: {
    marginTop: theme.spacing(3),
  },
  requestPanel: {
    marginTop: theme.spacing(4),
    flexGrow: 1,
  },
  copyright: {
    margin: '16px auto 0',
    color: theme.project.page.main.controlPanel.copyright.textColor,
  }
}))

export default function ControlPanel({connectionPanel, requestPanel}) {
  const classes = useStyles()

  return (
    <Paper className={classes.root} elevation={1} square>
      <div className={classes.connectionPanel}>
        {connectionPanel}
      </div>
      <div className={classes.requestPanel}>
        {requestPanel}
      </div>
      <div className={classes.copyright}>
        <Typography variant="body2" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://eng.marco79423.net/">兩大類</Link>{' '}
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
