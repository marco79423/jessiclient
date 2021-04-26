import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import useWindowSize from '../../../hooks/useWindowSize'
import List from '../../../elements/List'
import Message from './Message'


export default function MessageList({messages, selectedMessageID, onSelectedMessageChange}) {
  const [height, setHeight] = useState(0)
  const [_, windowHeight] = useWindowSize()

  useEffect(() => {
    setHeight(windowHeight - 64 - 64)
  }, [windowHeight])

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
