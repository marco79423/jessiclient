import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Chip, Grid, Typography} from '@material-ui/core'

import {MessageSource} from '../../constants'
import {
  addSearchFilter,
  clearMessages,
  clearSelectedMessageID,
  getMessages,
  getSearchFilters,
  removeSearchFilter,
  setSelectedMessageID
} from '../../slices'
import Button from '../elements/Button'
import SearchField from '../elements/SearchField'
import BasicDialog from '../elements/BasicDialog'
import List from '../elements/List'
import ListItem from '../elements/ListItem'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.background,
  },
  controlBar: {
    background: theme.project.page.main.listPanel.controlBar.background,
    height: 64,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  messageTitle: {
    color: ({fromClient}) => fromClient ? theme.project.page.main.listPanel.message.client.textColor : theme.project.page.main.listPanel.message.server.textColor,
    fontSize: '1rem',
  },
  messageContent: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: ({fromClient}) => fromClient ? theme.project.page.main.listPanel.message.client.textColor : theme.project.page.main.listPanel.message.server.textColor,
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


function ControlBar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const searchFilters = useSelector(getSearchFilters)
  const [clearAllDialogOn, setClearAllDialog] = useState(false)

  const onSearchButtonClicked = (value) => {
    dispatch(addSearchFilter(value))
  }

  const onClearButtonClicked = (id) => {
    dispatch(removeSearchFilter(id))
  }

  const showClearAllDialog = () => {
    setClearAllDialog(true)
  }

  const hideClearAllDialog = () => {
    setClearAllDialog(false)
  }

  return (
    <Grid className={classes.controlBar} container justify="space-between" alignItems="center">
      <Grid item>
        <Grid container alignItems="baseline" spacing={1}>
          <Grid item>
            <SearchField
              placeholder='搜尋訊息'
              onSearch={onSearchButtonClicked}
            />
          </Grid>
          {searchFilters.map(searchFilter => (
            <Grid key={searchFilter.id} item>
              <Chip
                label={searchFilter.text}
                onDelete={() => onClearButtonClicked(searchFilter.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Button className={classes.clearButton} onClick={showClearAllDialog}>
          清空訊息
        </Button>
        <ClearAllDialog open={clearAllDialogOn} onClose={hideClearAllDialog}/>
      </Grid>
    </Grid>
  )
}


function ClearAllDialog({open, onClose}) {
  const dispatch = useDispatch()

  const clearAllMessages = () => {
    dispatch(clearMessages())
    onClose()
  }

  return (
    <BasicDialog title={'確定刪除嗎？'}
                 open={open}
                 onClose={onClose}
                 actions={
                   <>
                     <Button onClick={onClose}>取消</Button>
                     <Button primary onClick={clearAllMessages}>刪除</Button>
                   </>
                 }>
      <Typography>刪除的訊息將不再能恢復</Typography>
    </BasicDialog>
  )
}

function MessageList() {
  const messages = useSelector(getMessages)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      setHeight(vh - 64 - 64)
    }
  }, [typeof document])

  return (
    <List height={height}>
      {messages.map(message => (
        <Message message={message}/>
      ))}
    </List>
  )
}


function Message({message}) {
  const fromClient = message.source === MessageSource.Client

  const classes = useStyles({fromClient})
  const dispatch = useDispatch()

  const onSelected = () => {
    if (message.selected) {
      dispatch(clearSelectedMessageID())
    } else {
      dispatch(setSelectedMessageID(message.id))
    }
  }

  const MessageTitle = ({message}) => {
    const time = new Date(message.time).toLocaleString()
    const source = fromClient ? '客戶端' : '服務端'

    return (
      <span className={classes.messageTitle}>{time} [{source}]</span>
    )
  }

  return (
    <ListItem
      key={message.id}
      selected={message.selected}
      title={<MessageTitle message={message}/>}
      onClick={onSelected}>
      <span className={classes.messageContent}>{message.text}</span>
    </ListItem>
  )
}
