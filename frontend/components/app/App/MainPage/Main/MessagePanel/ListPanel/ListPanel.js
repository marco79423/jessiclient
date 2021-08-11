import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

import ControlBar from './ControlBar'
import MessageList from './MessageList'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.background,
  },
}))


export default function ListPanel() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ControlBar/>
      <MessageList/>
    </div>
  )
}
