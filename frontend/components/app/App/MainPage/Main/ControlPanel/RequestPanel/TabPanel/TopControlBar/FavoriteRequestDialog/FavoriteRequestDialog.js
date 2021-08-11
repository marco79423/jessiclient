import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'

import BasicDialog from '../../../../../../../../../elements/BasicDialog'
import ControlBar from './ControlBar'
import FavoriteRequestBoard from './FavoriteRequestBoard/FavoriteRequestBoard'


export default function FavoriteRequestDialog({open, onClose}) {
  const {t} = useTranslation()

  return (
    <BasicDialog title={t('常用請求列表')} autoFullScreen open={open} onClose={onClose}>
      <ControlBar/>
      <FavoriteRequestBoard/>
    </BasicDialog>
  )
}

FavoriteRequestDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

