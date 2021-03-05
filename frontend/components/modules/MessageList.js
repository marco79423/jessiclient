import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Divider, Fab, List, ListItem, ListItemText, Typography} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'

import {MessageSource, LoadingState} from '../../constants'
import {
  changeSelectedMessageID,
  clearMessages,
  clearSelectedMessageID,
  getMessages,
  getMessageState
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

export default function MessageList() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const messageState = useSelector(getMessageState)
  const messages = useSelector(getMessages)

  const handleSelected = (message) => {
    if (message.selected) {
      dispatch(clearSelectedMessageID())
    } else {
      dispatch(changeSelectedMessageID(message.id))
    }
  }

  if (messageState === LoadingState.Idle) {
    return (
      <div className={classes.root}>
      </div>
    )
  }

  if (messageState === LoadingState.Loading) {
    return (
      <div className={classes.root}>
        讀取中…
      </div>
    )
  }

  if (messageState === LoadingState.Failed) {
    return (
      <div className={classes.root}>
        讀取失敗
      </div>
    )
  }

  const onClearAllButtonClick = () => {
    dispatch(clearMessages())
  }

  const MessageTitle = ({message}) => {
    const time = new Date(message.time).toLocaleString()
    const source = message.source === MessageSource.Server ? '服務端' : '客戶端'

    return (
      <span>{time}<Typography className={classes.source} color="textSecondary" variant="body2"
                              display="inline">[{source}]</Typography></span>
    )
  }

  return (
    <div className={classes.root}>
      <List>
        {messages.map(message => (
          <>
            <ListItem key={message.id} alignItems="flex-start" selected={message.selected}
                      onClick={() => handleSelected(message)}>
              <ListItemText
                primary={<MessageTitle message={message}/>}
                secondary={
                  <Typography
                    variant="body2"
                    className={classes.messageText}
                    color="textPrimary"
                  >
                    {message.text}
                  </Typography>
                }
              />
            </ListItem>
            <Divider key={message.id + '_divider'} component="li"/>
          </>
        ))}
      </List>
      <Fab className={classes.clearAll} onClick={onClearAllButtonClick}>
        <ClearIcon/>
      </Fab>
    </div>
  )
}
