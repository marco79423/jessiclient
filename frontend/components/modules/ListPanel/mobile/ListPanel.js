import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

import ControlBar from './ControlBar'
import MessageList from '../shared/MessageList'
import {AppMobileDisplayMode} from '../../../../constants'
import IconButton from '../../../elements/IconButton'
import {useTranslation} from 'next-i18next'


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
                                    setDisplayMode,
                                    messages,
                                    selectedMessageID,
                                    onSelectedMessageChange,
                                    onClearAllMessages
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

  const onClearAll = () => {
    onClearAllMessages()
    setSearchFilters([])
  }

  const backToControlPanel = () => {
    setDisplayMode(AppMobileDisplayMode.MainPanel)
  }

  return (
    <div className={classes.root}>
      <div className={classes.appBar}>
        <IconButton description={t('關閉訊息列表')} icon={CloseIcon} onClick={backToControlPanel}/>
      </div>

      <ControlBar
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
