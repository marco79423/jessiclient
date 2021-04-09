import React, {useEffect, useState} from 'react'
import {useGA4React} from 'ga-4-react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'

import {getMessages, getSelectedMessageID} from '../../../selectors'
import * as projectActions from '../../../slices/project'
import * as currentActions from '../../../slices/current'
import ControlBar from '../../modules/ListPanel/ControlBar'
import MessageList from './MessageList'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.background,
  },
}))

export default function ListPanel() {
  const classes = useStyles()
  const ga4React = useGA4React()
  const dispatch = useDispatch()
  const messages = useSelector(getMessages)
  const selectedMessageID = useSelector(getSelectedMessageID)
  const [filteredMessages, setFilteredMessages] = useState(messages)
  const [searchFilters, setSearchFilters] = useState([])

  useEffect(() => {
    setFilteredMessages(
      messages.filter(message => searchFilters.map(searchFilter => message.body.includes(searchFilter)).reduce((a, b) => a && b, true))
    )
  }, [messages, searchFilters])

  const setSelectedMessageID = (id) => {
    dispatch(currentActions.setSelectedMessageID(id))
  }

  const clearAllMessages = () => {
    dispatch(projectActions.clearMessages())
    dispatch(currentActions.setSelectedMessageID(null))
    setSearchFilters([])
    ga4React.gtag('event', 'clear_messages')
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
