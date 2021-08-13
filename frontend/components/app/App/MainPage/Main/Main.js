import React from 'react'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'

import {selectMessagePanelOn} from '../../../../../redux/selectors'
import useMobileMode from '../../../../hooks/useMobileMode'
import ControlPanel from './ControlPanel'
import MessagePanel from './MessagePanel'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
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
  const mobileMode = useMobileMode()

  const messagePanelOn = useSelector(selectMessagePanelOn)

  return (
    <div className={classes.root}>
      {
        !mobileMode ? (
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
