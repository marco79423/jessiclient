import React, {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import {MessageSource} from '../../../constants'
import List from '../../elements/List'
import ListItem from '../../elements/ListItem'
import PropTypes from 'prop-types'

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


export default function MessageList({messages, selectedMessageID, onSelectedMessageChange}) {
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
        <Message
          key={message.id}
          message={message}
          selectedMessageID={selectedMessageID}
          onSelectedMessageChange={onSelectedMessageChange}
        />
      ))}
    </List>
  )
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,
  selectedMessageID: PropTypes.string,
  onSelectedMessageChange: PropTypes.func.isRequired,
}


function Message({message, selectedMessageID, onSelectedMessageChange}) {
  const {t} = useTranslation('ListPanel')
  const fromClient = message.source === MessageSource.Client
  const classes = useStyles({fromClient})
  const selected = message.id === selectedMessageID

  const onSelected = () => {
    if (selected) {
      onSelectedMessageChange(null)
    } else {
      onSelectedMessageChange(message.id)
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
      selected={selected}
      title={<MessageTitle message={message}/>}
      onClick={onSelected}>
      <span className={classes.messageContent}>{message.body}</span>
    </ListItem>
  )
}
