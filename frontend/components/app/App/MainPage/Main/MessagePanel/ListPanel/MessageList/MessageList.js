import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {getFilterMessages} from '../../../../../../../../redux/selectors'
import useWindowSize from '../../../../../../../hooks/useWindowSize'
import List from '../../../../../../../elements/List'
import Message from './Message'


export default function MessageList() {
  const filteredMessages = useSelector(getFilterMessages)

  const [height, setHeight] = useState(0)

  // TODO: 不要用這種方式定義高度
  const [_, windowHeight] = useWindowSize()
  useEffect(() => {
    setHeight(windowHeight - 64 - 64)
  }, [windowHeight])

  return (
    <List height={height}>
      {filteredMessages.map(message => (
        <Message
          key={message.id}
          message={message}
        />
      ))}
    </List>
  )
}

MessageList.propTypes = {}
