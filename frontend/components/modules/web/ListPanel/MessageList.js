import React, {useEffect, useState} from 'react'
import List from '../../../elements/List'
import PropTypes from 'prop-types'
import {Message} from './Message'


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
