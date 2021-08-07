import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'

import {
  getCurrentFavoriteRequestID,
  getRequestBody,
  getSchedulerEnabledStatus
} from '../../../../../../../../../../redux/selectors'
import {removeFavoriteRequest} from '../../../../../../../../../../redux/project'
import {setCurrentFavoriteRequestID} from '../../../../../../../../../../redux/current'
import Button from '../../../../../../../../../elements/Button'
import AddFavoriteRequestDialog from './AddFavoriteRequestDialog'


export default function SetFavoriteRequestButton() {
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const requestBody = useSelector(getRequestBody)
  const scheduleEnabled = useSelector(getSchedulerEnabledStatus)
  const currentFavoriteRequestID = useSelector(getCurrentFavoriteRequestID)

  const [addFavoriteRequestDialogOpen, setAddFavoriteRequestDialogOpen] = useState(false)

  const disabled = requestBody === '' || scheduleEnabled

  const showAddFavoriteRequestDialog = () => {
    setAddFavoriteRequestDialogOpen(true)
  }

  const hideAddFavoriteRequestDialog = () => {
    setAddFavoriteRequestDialogOpen(false)
  }

  const addToFavorites = () => {
    showAddFavoriteRequestDialog()
  }

  const removeFromFavorites = () => {
    dispatch(removeFavoriteRequest(currentFavoriteRequestID))
    dispatch(setCurrentFavoriteRequestID(null))
  }

  const onClick = () => {
    if (currentFavoriteRequestID) {
      removeFromFavorites()
    } else {
      addToFavorites()
    }
  }

  return (
    <>
      <Button disabled={disabled} onClick={onClick}>
        {currentFavoriteRequestID ? t('取消常用') : t('設為常用')}
      </Button>

      <AddFavoriteRequestDialog
        open={addFavoriteRequestDialogOpen}
        onClose={hideAddFavoriteRequestDialog}
      />
    </>
  )
}

SetFavoriteRequestButton.propTypes = {}
