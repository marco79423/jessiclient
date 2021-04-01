import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'

import ControlBar from './ControlBar'
import MessageList from './MessageList'
import {getMessages, getSelectedMessageID} from '../../../selectors'
import * as projectActions from '../../../slices/project'
import * as currentActions from '../../../slices/current'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.background,
  },
}))

export default function ListPanel() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const messages = useSelector(getMessages)
  const selectedMessageID = useSelector(getSelectedMessageID)
  const [filteredMessages, setFilteredMessages] = useState(messages)
  const [searchFilters, setSearchFilters] = useState([])

  useEffect(() => {
    setFilteredMessages(
      messages.filter(message => searchFilters.map(searchFilter => message.text.includes(searchFilter)).reduce((a, b) => a && b, true))
    )
  }, [messages, searchFilters])

  const setSelectedMessageID = (id) => {
    dispatch(currentActions.setSelectedMessageID(id))
  }

  const clearAllMessages = () => {
    dispatch(projectActions.clearMessages())
    dispatch(currentActions.setSelectedMessageID(null))
    setSearchFilters([])
  }

  return (
    <div className={classes.root}>
      <ControlBar
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        clearAllMessages={clearAllMessages}
      />

      <MessageList
        messages={filteredMessages}
        selectedMessageID={selectedMessageID}
        setSelectedMessageID={setSelectedMessageID}
      />
    </div>
  )
}
