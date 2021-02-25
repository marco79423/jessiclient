import React from 'react'
import {AppBar, Divider, List, ListItem, ListItemText, Tab, Tabs, Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch, useSelector} from 'react-redux'

import {selectHistories, selectHistoryState} from '../../slices/historySlice'
import {LoadingState} from '../../constants'
import {createDraftSafeSelector} from '@reduxjs/toolkit'
import {selectHistory, selectSelectedHistoryID, unselectHistory} from '../../slices/currentSlice'


const selectHistoriesWithSelectedFlag = createDraftSafeSelector(
  [
    selectSelectedHistoryID,
    selectHistories,
  ],
  (selectedID, histories) => histories.map(history => ({
    ...history,
    selected: history.id === selectedID,
  })),
)

const useStyles = makeStyles((theme) => ({
  root: {},
  messageText: {
    height: 40,

    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}))

export default function ListPanel() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const historyState = useSelector(selectHistoryState)
  const histories = useSelector(selectHistoriesWithSelectedFlag)

  const handleSelected = (history) => {
    if (history.selected) {
      dispatch(unselectHistory(history.id))
    } else {
      dispatch(selectHistory(history.id))
    }
  }

  if (historyState === LoadingState.Idle) {
    return (
      <div className={classes.root}>
      </div>
    )
  }

  if (historyState === LoadingState.Loading) {
    return (
      <div className={classes.root}>
        讀取中…
      </div>
    )
  }

  if (historyState === LoadingState.Failed) {
    return (
      <div className={classes.root}>
        讀取失敗
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Tabs value={0}>
            <Tab label="訊息"/>
            <Tab label="Log"/>
          </Tabs>
        </Toolbar>
      </AppBar>
      <List>
        {histories.map(history => (
          <>
            <ListItem key={history.id} alignItems="flex-start" selected={history.selected} onClick={() => handleSelected(history)}>
              <ListItemText
                primary={new Date(history.time).toLocaleString()}
                secondary={
                  <Typography
                    variant="body2"
                    className={classes.messageText}
                    color="textPrimary"
                  >
                    {history.text}
                  </Typography>
                }
              />
            </ListItem>
            <Divider key={history.id + '_divider'} component="li"/>
          </>
        ))}
      </List>
    </div>
  )
}
