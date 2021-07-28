import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import {MessageSource} from '../../../../constants'
import ListItem from '../../../elements/ListItem'

const useStyles = makeStyles((theme) => ({
  messageTitle: ({fromClient}) => ({
    color: fromClient ? theme.project.page.main.listPanel.message.client.textColor : theme.project.page.main.listPanel.message.server.textColor,
    fontSize: '1rem',
  }),
  messageContent: ({fromClient}) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    height: 40,
    color: fromClient ? theme.project.page.main.listPanel.message.client.textColor : theme.project.page.main.listPanel.message.server.textColor,
  }),
}))

export function Message({message, selectedMessageID, onSelectedMessageChange}) {
  const {t} = useTranslation()
  const fromClient = message.source === MessageSource.Client
  const time = new Date(message.time).toLocaleString()
  const selected = message.id === selectedMessageID

  const classes = useStyles({fromClient})

  const onSelected = () => {
    onSelectedMessageChange(selected ? null : message.id)
  }

  return (
    <ListItem
      selected={selected}
      title={<span className={classes.messageTitle}>{time} [{fromClient ? t('客戶端') : t('服務端')}]</span>}
      onClick={onSelected}>
      <div className={classes.messageContent}>{message.body}</div>
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
  selectedMessageID: PropTypes.bool.isRequired,
  onSelectedMessageChange: PropTypes.func.isRequired,
}

export default memo(Message)