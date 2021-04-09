import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Typography} from '@material-ui/core'

import BasicDialog from '../../elements/BasicDialog'
import Button from '../../elements/Button'


export default function ClearAllDialog({open, onClose, clearAllMessages}) {
  const {t} = useTranslation('ListPanel')

  const onClearAllButtonClick = () => {
    clearAllMessages()
    onClose()
  }

  return (
    <BasicDialog
      title={t('確定清空訊息嗎？')}
      open={open}
      onClose={onClose}
      actions={
        <>
          <Button onClick={onClose}>{t('取消')}</Button>
          <Button primary onClick={onClearAllButtonClick}>{t('清空訊息')}</Button>
        </>
      }
    >
      <Typography>{t('清空的訊息將不再能恢復')}</Typography>
    </BasicDialog>
  )
}

ClearAllDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  clearAllMessages: PropTypes.func.isRequired,
}
