import React, {memo} from 'react'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import {MessageSource} from '../../../../constants'
import ListItem from '../../../elements/ListItem'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  messageTitle: ({fromClient}) => ({
    color: fromClient ? theme.project.page.main.listPanel.message.client.textColor : theme.project.page.main.listPanel.message.server.textColor,
    fontSize: '1rem',
  }),
  messageContent: ({fromClient}) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: fromClient ? theme.project.page.main.listPanel.message.client.textColor : theme.project.page.main.listPanel.message.server.textColor,
  }),
}))

export function Message({message, selectedMessageID, onSelectedMessageChange}) {
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

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  selectedMessageID: PropTypes.string,
  onSelectedMessageChange: PropTypes.func.isRequired,
}

export default memo(Message)
