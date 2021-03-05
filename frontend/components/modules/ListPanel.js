import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Toolbar} from '@material-ui/core'

import HistoryList from './HistoryList'


const useStyles = makeStyles((theme) => ({
  root: {},
  controlBar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 64,
  },
  dataSection: {
    padding: 0,
    position: 'relative',
    overflow: 'auto',
    height: 'calc(100vh - 64px)',
  }
}))

export default function ListPanel() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Toolbar className={classes.controlBar}>

      </Toolbar>
      <div className={classes.dataSection}>
        <HistoryList/>
      </div>
    </div>
  )
}
