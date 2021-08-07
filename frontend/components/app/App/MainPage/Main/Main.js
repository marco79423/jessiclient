import React from 'react'
import ControlPanel from './ControlPanel'
import {makeStyles} from '@material-ui/core/styles'
import useWindowSize from '../../../../hooks/useWindowSize'
import {useSelector} from 'react-redux'
import {getMessagePanelOn} from '../../../../../redux/selectors'
import MessagePanel from './MessagePanel'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: theme.project.page.main.background,
    height: 'calc(100vh - 64px)'
  },
  controlPanel: {
    flex: 1,
    maxWidth: 500,
  },
  messagePanel: {
    flex: 1,
  }
}))

export default function Main() {
  const classes = useStyles()
  const [windowWidth, _] = useWindowSize()

  const messagePanelOn = useSelector(getMessagePanelOn)

  return (
    <div className={classes.root}>
      {
        windowWidth > 500 ? (
          <>
            <div className={classes.controlPanel}>
              <ControlPanel/>
            </div>
            <div className={classes.messagePanel}>
              <MessagePanel/>
            </div>
          </>
        ) : (
          !messagePanelOn ? (
            <div className={classes.controlPanel}>
              <ControlPanel/>
            </div>) : (
            <div className={classes.messagePanel}>
              <MessagePanel/>
            </div>
          )
        )
      }
    </div>
  )
}
