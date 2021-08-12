import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import {MessageSource} from '../../../../../../../../../constants'
import ListItem from '../../../../../../../../elements/ListItem'
import * as currentActions from '../../../../../../../../../redux/current'
import {useDispatch, useSelector} from 'react-redux'
import {selectMessage, selectSelectedMessageID} from '../../../../../../../../../redux/selectors'

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

export default function Message({id}) {
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const selectedMessageID = useSelector(selectSelectedMessageID)
  const message = useSelector(selectMessage(id))

  const fromClient = message.source === MessageSource.Client
  const time = new Date(message.time).toLocaleString()
  const selected = message.id === selectedMessageID

  const classes = useStyles({fromClient})

  const onSelected = () => {
    dispatch(currentActions.setSelectedMessageID(selected ? null : message.id))
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
  id: PropTypes.string.isRequired,
}
