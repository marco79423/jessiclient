import {useGA4React} from 'ga-4-react'
import {MessageSource} from '../../../constants'
import {useDispatch, useSelector} from 'react-redux'
import {clearSelectedMessageID, getMessages, setSelectedMessageID} from '../../../slices'
import React, {useEffect, useState} from 'react'

import List from '../../elements/List'
import ListItem from '../../elements/ListItem'
import {makeStyles} from '@material-ui/core/styles'


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


export default function MessageList() {
  const messages = useSelector(getMessages)
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
        <Message message={message}/>
      ))}
    </List>
  )
}

function Message({message}) {
  const fromClient = message.source === MessageSource.Client
  const classes = useStyles({fromClient})
  const dispatch = useDispatch()
  const ga4React = useGA4React()


  const onSelected = () => {
    if (message.selected) {
      dispatch(clearSelectedMessageID())
    } else {
      dispatch(setSelectedMessageID(message.id))
      ga4React.gtag('event', 'select_message')
    }
  }

  const MessageTitle = ({message}) => {
    const time = new Date(message.time).toLocaleString()
    const source = fromClient ? '客戶端' : '服務端'

    return (
      <span className={classes.messageTitle}>{time} [{source}]</span>
    )
  }

  return (
    <ListItem
      key={message.id}
      selected={message.selected}
      title={<MessageTitle message={message}/>}
      onClick={onSelected}>
      <span className={classes.messageContent}>{message.text}</span>
    </ListItem>
  )
}
