import React, {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

import useMobileMode from '../../../hooks/useMobileMode'
import IconButton from '../../../elements/IconButton'
import ControlBar from './ControlBar'
import MessageList from './MessageList'
import {AppMobileDisplayMode, AppWebDisplayMode} from '../../../../constants'


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
                                    messages,
                                    selectedMessageID,
                                    onSelectedMessageChange,
                                    onClearAllMessages,

                                    onChangeWebDisplayMode,
                                    onChangeMobileDisplayMode,
                                  }) {
  const classes = useStyles()
  const {t} = useTranslation()
  const mobileMode = useMobileMode()
  const [filteredMessages, setFilteredMessages] = useState(messages)
  const [searchFilters, setSearchFilters] = useState([])

  useEffect(() => {
    setFilteredMessages(
      messages.filter(message => searchFilters.map(searchFilter => message.body.includes(searchFilter)).reduce((a, b) => a && b, true))
    )
  }, [messages, searchFilters])

  useEffect(() => {
    if (mobileMode) {
      if (selectedMessageID) {
        onChangeMobileDisplayMode(AppMobileDisplayMode.DetailPanel)
      } else {
        onChangeMobileDisplayMode(AppMobileDisplayMode.ListPanel)
      }
    } else {
      if (selectedMessageID) {
        onChangeWebDisplayMode(AppWebDisplayMode.DetailPanelOn)
      } else {
        onChangeWebDisplayMode(AppWebDisplayMode.DetailPanelOff)
      }
    }
  }, [mobileMode, selectedMessageID])

  const onClearAllMessagesWrapped = () => {
    onClearAllMessages()
    setSearchFilters([])
  }

  const onCloseButtonClick = () => {
    onChangeMobileDisplayMode(AppMobileDisplayMode.MainPanel)
  }

  return (
    <div className={classes.root}>
      {mobileMode ? <div className={classes.appBar}>
        <IconButton description={t('關閉訊息列表')} icon={CloseIcon} onClick={onCloseButtonClick}/>
      </div> : null}

      <ControlBar
        searchFilters={searchFilters}
        onSearchFilterChange={setSearchFilters}
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
