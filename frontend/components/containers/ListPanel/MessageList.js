import React, {useEffect, useState} from 'react'
import {useGA4React} from 'ga-4-react'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import {MessageSource} from '../../../constants'
import List from '../../elements/List'
import ListItem from '../../elements/ListItem'

const useStyles = makeStyles((theme) => ({
  messageTitle: {
    color: ({fromClient}) => fromClient ? theme.project.page.main.listPanel.message.client.textColor : theme.project.page.main.listPanel.message.server.textColor,
    fontSize: '1rem',
  },
  messageContent: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: ({fromClient}) => fromClient ? theme.project.page.main.listPanel.message.client.textColor : theme.project.page.main.listPanel.message.server.textColor,
  },
}))


export default function MessageList({messages, selectedMessageID, setSelectedMessageID}) {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      setHeight(vh - 64 - 64)
    }
  }, [typeof document])

  return (
    <List height={height}>
      {messages.map(message => (
        <Message message={message}
                 selectedMessageID={selectedMessageID}
                 setSelectedMessageID={setSelectedMessageID}/>
      ))}
    </List>
  )
}

function Message({message, selectedMessageID, setSelectedMessageID}) {
  const {t} = useTranslation('common')
  const fromClient = message.source === MessageSource.Client
  const classes = useStyles({fromClient})
  const ga4React = useGA4React()
  const selected = message.id === selectedMessageID

  const onSelected = () => {
    if (selected) {
      setSelectedMessageID(null)
    } else {
      setSelectedMessageID(message.id)
      ga4React.gtag('event', 'select_message')
    }
  }

  const MessageTitle = ({message}) => {
    const time = new Date(message.time).toLocaleString()
    const source = fromClient ? t('客戶端') : t('服務端')

    return (
      <span className={classes.messageTitle}>{time} [{source}]</span>
    )
  }

  return (
    <ListItem
      key={message.id}
      selected={selected}
      title={<MessageTitle message={message}/>}
      onClick={onSelected}>
      <span className={classes.messageContent}>{message.text}</span>
    </ListItem>
  )
}
