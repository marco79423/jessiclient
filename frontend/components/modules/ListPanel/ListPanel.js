import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'

import ControlBar from '../../modules/ListPanel/ControlBar'
import MessageList from '../../modules/ListPanel/MessageList'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.background,
  },
}))

export default function ListPanel({messages, selectedMessageID, onSelectedMessageChange, onClearAllMessages}) {
  const classes = useStyles()
  const [filteredMessages, setFilteredMessages] = useState(messages)
  const [searchFilters, setSearchFilters] = useState([])

  useEffect(() => {
    setFilteredMessages(
      messages.filter(message => searchFilters.map(searchFilter => message.body.includes(searchFilter)).reduce((a, b) => a && b, true))
    )
  }, [messages, searchFilters])

  const onClearAll = () => {
    onClearAllMessages()
    setSearchFilters([])
  }

  return (
    <div className={classes.root}>
      <ControlBar
        searchFilters={searchFilters}
        onSearchFilterChange={setSearchFilters}
        onClearAll={onClearAll}
      />

      <MessageList
        messages={filteredMessages}
        selectedMessageID={selectedMessageID}
        onSelectedMessageChange={onSelectedMessageChange}
      />
    </div>
  )
}
