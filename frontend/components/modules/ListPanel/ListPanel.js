import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'

import ControlBar from './ControlBar'
import MessageList from './MessageList'
import * as slices from '../../../slices'
import {getMessages, getSelectedMessageID} from '../../../slices'


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
    dispatch(slices.setSelectedMessageID(id))
  }

  const clearAllMessages = () => {
    dispatch(slices.clearMessages())
    dispatch(slices.setSelectedMessageID(null))
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
