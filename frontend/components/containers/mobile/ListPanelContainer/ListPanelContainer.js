import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {AppMobileDisplayMode} from '../../../../constants'
import * as projectActions from '../../../../redux/project'
import * as currentActions from '../../../../redux/current'
import {getMessages, getSelectedMessageID} from '../../../../redux/selectors'
import ListPanel from '../../../modules/ListPanel/mobile/ListPanel/ListPanel'


export default function ListPanelContainer({setDisplayMode, appController}) {
  const dispatch = useDispatch()
  const messages = useSelector(getMessages)
  const selectedMessageID = useSelector(getSelectedMessageID)

  useEffect(() => {
    if (selectedMessageID) {
      setDisplayMode(AppMobileDisplayMode.DetailPanel)
    } else {
      setDisplayMode(AppMobileDisplayMode.ListPanel)
    }
  }, [selectedMessageID])

  const onSelectedMessageChange = (id) => {
    dispatch(currentActions.setSelectedMessageID(id))
  }

  const onClearAllMessages = () => {
    dispatch(projectActions.clearMessages())
    dispatch(currentActions.setSelectedMessageID(null))
    appController.track('clear_messages')
  }

  const onClose = () => {
    setDisplayMode(AppMobileDisplayMode.MainPanel)
  }

  return (
    <ListPanel
      onClose={onClose}
      messages={messages}
      selectedMessageID={selectedMessageID}
      onSelectedMessageChange={onSelectedMessageChange}
      onClearAllMessages={onClearAllMessages}
    />
  )
}
