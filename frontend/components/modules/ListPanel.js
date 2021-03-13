import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Chip, Grid, List, ListItem, ListItemText, Typography} from '@material-ui/core'

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
import SearchField from '../elements/SearchField'


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

export default function ListPanel() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const projectState = useSelector(getProjectState)
  const messages = useSelector(getMessages)
  const searchInput = useSelector(getSearchInput)

  const onSearchButtonClicked = (value) => {
    dispatch(changeSearchInput(value))
  }

  const onClearButtonClicked = () => {
    dispatch(changeSearchInput(''))
  }

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
          <Grid container alignItems="baseline" spacing={1}>
            <Grid item>
              <SearchField
                placeholder='搜尋訊息'
                searchText={searchInput}
                onSearch={onSearchButtonClicked}
              />
            </Grid>
            <Grid item>
              {searchInput ? (<Chip
                label={searchInput}
                onDelete={onClearButtonClicked}
              />) : null}
            </Grid>
          </Grid>
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
