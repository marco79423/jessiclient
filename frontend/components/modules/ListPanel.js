import React from 'react'
import {AppBar, Divider, List, ListItem, ListItemText, Tab, Tabs, Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {selectHistories, selectHistoryState} from '../../slices/historySlice'
import {useSelector} from 'react-redux'
import {LoadingState} from '../../constants'


const useStyles = makeStyles((theme) => ({
  root: {
  },
  messageText: {
    height: 40,
    
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}))

export default function ListPanel() {
  const classes = useStyles()

  const historyState = useSelector(selectHistoryState)
  const histories = useSelector(selectHistories)

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
            <ListItem key={history.id} alignItems="flex-start">
              <ListItemText
                primary={history.time.toLocaleString()}
                secondary={
                  <React.Fragment>
                    <Typography
                      variant="body2"
                      className={classes.messageText}
                      color="textPrimary"
                    >
                      {history.text}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li"/>
          </>
        ))}
      </List>
    </div>
  )
}
