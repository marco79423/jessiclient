import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as projectActions from '../../../../redux/project'
import * as currentActions from '../../../../redux/current'
import {changeMobileDisplayMode, changeWebDisplayMode} from '../../../../redux/current'
import {getMessages, getSelectedMessageID} from '../../../../redux/selectors'
import ListPanel from '../../../modules/content/ListPanel'


export default function ListPanelContainer({appController}) {
  const dispatch = useDispatch()
  const messages = useSelector(getMessages)
  const selectedMessageID = useSelector(getSelectedMessageID)

  const onSelectedMessageChange = (id) => {
    dispatch(currentActions.setSelectedMessageID(id))
  }

  const onClearAllMessages = () => {
    dispatch(projectActions.clearMessages())
    dispatch(currentActions.setSelectedMessageID(null))
    appController.tracker.trace('clear_messages')
  }

  const onChangeWebDisplayMode = (webDisplayMode) => {
    dispatch(changeWebDisplayMode(webDisplayMode))
  }

  const onChangeMobileDisplayMode = (mobileDisplayMode) => {
    dispatch(changeMobileDisplayMode(mobileDisplayMode))
  }

  return (
    <ListPanel
      messages={messages}
      selectedMessageID={selectedMessageID}
      onSelectedMessageChange={onSelectedMessageChange}
      onClearAllMessages={onClearAllMessages}

      onChangeWebDisplayMode={onChangeWebDisplayMode}
      onChangeMobileDisplayMode={onChangeMobileDisplayMode}
    />
  )
}
