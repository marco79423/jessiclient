import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'

import {changeShareLink, clearShareLink} from '../../../slices/current'
import {getShareLink} from '../../../selectors'
import ShareDialog from '../../modules/common/ShareDialog'


export default function ShareDialogContainer({appController, open, onClose}) {
  const dispatch = useDispatch()
  const shareLink = useSelector(getShareLink)
  const {t} = useTranslation('Toolbar')

  const generateShareLink = async ({messageIncluded}) => {
    try {
      const shareLink = await appController.generateShareLink({messageIncluded})
      await dispatch(changeShareLink(shareLink))
    } catch (e) {
      console.log(e)
      appController.throwError(t('產生分享連結失敗'))
    }
  }

  const wrappedOnClose = () => {
    dispatch(clearShareLink())
    onClose()
  }

  return (
    <ShareDialog
      open={open}
      onClose={wrappedOnClose}
      shareLink={shareLink}
      generateShareLink={generateShareLink}
    />
  )
}

ShareDialogContainer.propTypes = {
  appController: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
