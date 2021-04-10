import React from 'react'
import {useGA4React} from 'ga-4-react'
import {useDispatch, useSelector} from 'react-redux'

import * as projectActions from '../../../slices/project'
import * as currentActions from '../../../slices/current'
import {getMessages, getSelectedMessageID} from '../../../selectors'
import ListPanel from '../../modules/ListPanel/ListPanel'


export default function ListPanelContainer() {
  const ga4React = useGA4React()
  const dispatch = useDispatch()
  const messages = useSelector(getMessages)
  const selectedMessageID = useSelector(getSelectedMessageID)

  const onSelectedMessageChange = (id) => {
    dispatch(currentActions.setSelectedMessageID(id))
  }

  const clearAllMessages = () => {
    dispatch(projectActions.clearMessages())
    dispatch(currentActions.setSelectedMessageID(null))
    ga4React.gtag('event', 'clear_messages')
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
