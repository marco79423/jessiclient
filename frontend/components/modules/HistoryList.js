import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Divider, List, ListItem, ListItemText, Typography} from '@material-ui/core'

import {HistorySource, LoadingState} from '../../constants'
import {changeSelectedHistoryID, clearSelectedHistoryID, getHistories, getHistoryState} from '../../slices'


const useStyles = makeStyles((theme) => ({
  root: {},
  messageText: {
    height: 40,

    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  source: {
    marginLeft: theme.spacing(1),
  }
}))

export default function HistoryList() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const historyState = useSelector(getHistoryState)
  const histories = useSelector(getHistories)

  const handleSelected = (history) => {
    if (history.selected) {
      dispatch(clearSelectedHistoryID())
    } else {
      dispatch(changeSelectedHistoryID(history.id))
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

  const HistoryTitle = ({history}) => {
    const time = new Date(history.time).toLocaleString()
    const source = history.source === HistorySource.Server ? '服務端' : '客戶端'

    return (
      <span>{time}<Typography className={classes.source} color="textSecondary" variant="body2" display="inline">[{source}]</Typography></span>
    )
  }

return (
  <div className={classes.root}>
    <List>
      {histories.map(history => (
        <>
          <ListItem key={history.id} alignItems="flex-start" selected={history.selected}
                    onClick={() => handleSelected(history)}>
            <ListItemText
              primary={<HistoryTitle history={history}/>}
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
