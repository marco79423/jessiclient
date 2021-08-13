import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'

import {removeFavoriteRequest} from '../../../../../../../../../../redux/project'
import {setCurrentFavoriteRequestID} from '../../../../../../../../../../redux/current'
import {selectCurrentFavoriteRequestID, selectRequestBody} from '../../../../../../../../../../redux/selectors'
import Button from '../../../../../../../../../elements/Button'
import AddFavoriteRequestDialog from './AddFavoriteRequestDialog'


export default function SetFavoriteRequestButton() {
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const requestBody = useSelector(selectRequestBody)
  const currentFavoriteRequestID = useSelector(selectCurrentFavoriteRequestID)

  const [addFavoriteRequestDialogOpen, setAddFavoriteRequestDialogOpen] = React.useState(false)

  const onAddToFavoritesButtonClick = () => {
    showAddFavoriteRequestDialog()
  }

  const onRemoveFromFavoritesButtonClick = () => {
    dispatch(removeFavoriteRequest(currentFavoriteRequestID))
    dispatch(setCurrentFavoriteRequestID(null))
  }

  const showAddFavoriteRequestDialog = () => {
    setAddFavoriteRequestDialogOpen(true)
  }

  const hideAddFavoriteRequestDialog = () => {
    setAddFavoriteRequestDialogOpen(false)
  }

  return (
    <>
      {currentFavoriteRequestID ? (
        <Button onClick={onRemoveFromFavoritesButtonClick}>{t('取消常用')}</Button>
      ) : (
        <Button disabled={requestBody === ''} onClick={onAddToFavoritesButtonClick}>{t('設為常用')}</Button>
      )}

      <AddFavoriteRequestDialog
        open={addFavoriteRequestDialogOpen}
        onClose={hideAddFavoriteRequestDialog}
      />
    </>
  )
}

SetFavoriteRequestButton.propTypes = {}
