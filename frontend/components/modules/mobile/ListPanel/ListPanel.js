import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'

import ControlBar from './ControlBar'
import MessageList from './MessageList'
import Button from '../../../elements/Button'
import {AppMobileDisplayMode} from '../../../../constants'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.background,
  },
}))

export default function ListPanel({setDisplayMode, messages, selectedMessageID, onSelectedMessageChange, onClearAllMessages}) {
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
      <div>
        <Button onClick={() => setDisplayMode(AppMobileDisplayMode.MainPanel)}>切換</Button>
        <Button onClick={() => setDisplayMode(AppMobileDisplayMode.DetailPanel)}>切換</Button>
      </div>

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
