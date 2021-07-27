import React, {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

import ControlBar from './ControlBar'
import MessageList from '../../shared/MessageList/MessageList'
import IconButton from '../../../../elements/IconButton'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.background,
  },
  appBar: {
    background: theme.project.page.header.background,
    height: 64,
  },
}))

export default function ListPanel({
                                    onClose,
                                    messages,
                                    selectedMessageID,
                                    onSelectedMessageChange,
                                    onClearAllMessages,
                                  }) {
  const classes = useStyles()
  const {t} = useTranslation()
  const [filteredMessages, setFilteredMessages] = useState(messages)
  const [searchFilters, setSearchFilters] = useState([])

  useEffect(() => {
    setFilteredMessages(
      messages.filter(message => searchFilters.map(searchFilter => message.body.includes(searchFilter)).reduce((a, b) => a && b, true))
    )
  }, [messages, searchFilters])

  const onClearAllMessagesWrapped = () => {
    onClearAllMessages()
    setSearchFilters([])
  }

  const onCloseButtonClick = () => {
    onClose()
  }

  return (
    <div className={classes.root}>
      <div className={classes.appBar}>
        <IconButton description={t('關閉訊息列表')} icon={CloseIcon} onClick={onCloseButtonClick}/>
      </div>

      <ControlBar
        onClearAllMessages={onClearAllMessagesWrapped}
      />

      <MessageList
        messages={filteredMessages}
        selectedMessageID={selectedMessageID}
        onSelectedMessageChange={onSelectedMessageChange}
      />
    </div>
  )
}
