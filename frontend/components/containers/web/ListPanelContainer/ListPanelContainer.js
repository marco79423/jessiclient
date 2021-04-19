import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as projectActions from '../../../../slices/project'
import * as currentActions from '../../../../slices/current'
import {getMessages, getSelectedMessageID} from '../../../../selectors'
import ListPanel from '../../../modules/ListPanel/ListPanel'


export default function ListPanelContainer({appController}) {
  const dispatch = useDispatch()
  const messages = useSelector(getMessages)
  const selectedMessageID = useSelector(getSelectedMessageID)

  const onSelectedMessageChange = (id) => {
    dispatch(currentActions.setSelectedMessageID(id))
  }

  const clearAllMessages = () => {
    dispatch(projectActions.clearMessages())
    dispatch(currentActions.setSelectedMessageID(null))
    appController.track('clear_messages')
  }

  return (
    <ListPanel
      messages={messages}
      selectedMessageID={selectedMessageID}
      onSelectedMessageChange={onSelectedMessageChange}
      onClearAllMessages={clearAllMessages}
    />
  )
}
