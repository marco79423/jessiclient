import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Divider, Fab, List, ListItem, ListItemText, Typography} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'

import {LoadingState} from '../../constants'
import {clearLogs, getLogs, getLogState} from '../../slices'


const useStyles = makeStyles((theme) => ({
  root: {},
  messageText: {
    height: 40,

    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  clearAll: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}))

export default function LogList() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const logState = useSelector(getLogState)
  const logs = useSelector(getLogs)

  if (logState === LoadingState.Idle) {
    return (
      <div className={classes.root}>
      </div>
    )
  }

  if (logState === LoadingState.Loading) {
    return (
      <div className={classes.root}>
        讀取中…
      </div>
    )
  }

  if (logState === LoadingState.Failed) {
    return (
      <div className={classes.root}>
        讀取失敗
      </div>
    )
  }

  const onClearAllButtonClick = () => {
    dispatch(clearLogs())
  }

  return (
    <div className={classes.root}>
      <List>
        {logs.map(log => (
          <>
            <ListItem key={log.id} alignItems="flex-start">
              <ListItemText
                primary={new Date(log.time).toLocaleString()}
                secondary={
                  <Typography
                    variant="body2"
                    className={classes.messageText}
                    color="textPrimary"
                  >
                    {log.data}
                  </Typography>
                }
              />
            </ListItem>
            <Divider key={log.id + '_divider'} component="li"/>
          </>
        ))}
      </List>
      <Fab className={classes.clearAll} onClick={onClearAllButtonClick}>
        <ClearIcon/>
      </Fab>
    </div>
  )
}
