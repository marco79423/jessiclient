import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {AppWebDisplayMode} from '../../../../constants'
import * as projectActions from '../../../../slices/project'
import * as currentActions from '../../../../slices/current'
import {getMessages, getSelectedMessageID} from '../../../../selectors'
import ListPanel from '../../../modules/web/ListPanel/ListPanel'


export default function ListPanelContainer({appController, setDisplayMode}) {
  const dispatch = useDispatch()
  const messages = useSelector(getMessages)
  const selectedMessageID = useSelector(getSelectedMessageID)

  useEffect(() => {
    if (selectedMessageID) {
      setDisplayMode(AppWebDisplayMode.DetailPanelOn)
    } else {
      setDisplayMode(AppWebDisplayMode.DetailPanelOff)
    }
  }, [selectedMessageID])

  const onSelectedMessageChange = useCallback((id) => {
    dispatch(currentActions.setSelectedMessageID(id))
  }, [])

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
