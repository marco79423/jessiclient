import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Divider, Fab, List, ListItem, ListItemText, Typography} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'

import {HistorySource, LoadingState} from '../../constants'
import {
  changeSelectedHistoryID,
  clearHistories,
  clearSelectedHistoryID,
  getHistories,
  getHistoryState
} from '../../slices'


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
  },
  messageText: {
    height: 40,

    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  source: {
    marginLeft: theme.spacing(1),
  },
  clearAll: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(3),
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

  const onClearAllButtonClick = () => {
    dispatch(clearHistories())
  }

  const HistoryTitle = ({history}) => {
    const time = new Date(history.time).toLocaleString()
    const source = history.source === HistorySource.Server ? '服務端' : '客戶端'

    return (
      <span>{time}<Typography className={classes.source} color="textSecondary" variant="body2"
                              display="inline">[{source}]</Typography></span>
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
      <Fab className={classes.clearAll} onClick={onClearAllButtonClick}>
        <ClearIcon/>
      </Fab>
    </div>
  )
}
