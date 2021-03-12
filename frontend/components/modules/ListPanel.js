import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Button as MuiButton, Grid, IconButton, InputBase, List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'

import {LoadingState, MessageSource} from '../../constants'
import {
  changeSearchInput,
  clearMessages,
  clearSelectedMessageID,
  getMessages,
  getProjectState,
  getSearchInput,
  setSelectedMessageID
} from '../../slices'
import Button from '../elements/Button'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.background,
  },
  controlBar: {
    background: theme.project.page.main.listPanel.controlBar.background,
    height: 64,
  },
  searchInput: {
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    width: 300,
  },
  clearButton: {
    marginRight: theme.spacing(2),
  },
  dataSection: {
    padding: 0,
    position: 'relative',
    overflow: 'auto',
    height: 'calc(100vh - 64px - 64px)',
  },
  message: {
    background: theme.project.page.main.listPanel.message.background,
    '&:not(:first-child)': {
      marginTop: 1
    }
  },
  messageSource: {
    marginLeft: theme.spacing(1),
  },
  messageText: {
    marginTop: theme.spacing(1),
    height: 40,

    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

function SearchInput() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const searchInput = useSelector(getSearchInput)

  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(searchInput)
  }, [searchInput])

  const onValueChange = (e) => {
    setValue(e.target.value)
  }

  const onSearchButtonClicked = () => {
    dispatch(changeSearchInput(value))
  }

  const onClearButtonClicked = () => {
    dispatch(changeSearchInput(''))
  }

  return (
    <Grid className={classes.searchInput} container alignItems="center" component={Paper}>
      <Grid item xs>
        <InputBase fullWidth placeholder="搜尋訊息" value={value} onChange={onValueChange}/>
      </Grid>
      <Grid item>
        {searchInput ? (
          <IconButton size="small" onClick={onClearButtonClicked}>
            <ClearIcon/>
          </IconButton>
        ) : null}
      </Grid>
      <Grid item>
        <MuiButton onClick={onSearchButtonClicked}>搜尋</MuiButton>
      </Grid>
    </Grid>
  )
}

export default function ListPanel() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const projectState = useSelector(getProjectState)
  const messages = useSelector(getMessages)

  const onClearAllButtonClick = () => {
    dispatch(clearMessages())
  }

  const handleSelected = (message) => {
    if (message.selected) {
      dispatch(clearSelectedMessageID())
    } else {
      dispatch(setSelectedMessageID(message.id))
    }
  }

  if (projectState === LoadingState.Idle) {
    return (
      <div className={classes.root}>
      </div>
    )
  }

  if (projectState === LoadingState.Loading) {
    return (
      <div className={classes.root}>
        讀取中…
      </div>
    )
  }

  if (projectState === LoadingState.Failed) {
    return (
      <div className={classes.root}>
        讀取失敗
      </div>
    )
  }

  const MessageTitle = ({message}) => {
    const time = new Date(message.time).toLocaleString()
    const source = message.source === MessageSource.Server ? '服務端' : '客戶端'

    return (
      <span>{time}<Typography className={classes.messageSource} color="textSecondary" variant="body2"
                              display="inline">[{source}]</Typography></span>
    )
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.controlBar} container justify="space-between" alignItems="center"
            elevation={1} square>
        <Grid item>
          <SearchInput/>
        </Grid>
        <Grid item>
          <Button className={classes.clearButton} onClick={onClearAllButtonClick}>
            清空訊息
          </Button>
        </Grid>
      </Grid>
      <List className={classes.dataSection}>
        {messages.map(message => (
          <>
            <ListItem className={classes.message} key={message.id} selected={message.selected}
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
          </>
        ))}
      </List>
    </div>
  )
}
