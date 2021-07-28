import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {useTranslation} from 'next-i18next'
import {Typography} from '@material-ui/core'

import BasicDialog from '../../../elements/BasicDialog'
import Button from '../../../elements/Button'


const useStyles = makeStyles((theme) => ({
  message: {
    marginTop: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))


export default function ClearAllMessagesDialog({open, onClose, onClearAll}) {
  const classes = useStyles()
  const {t} = useTranslation()

  const onClearAllButtonClick = () => {
    onClearAll()
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
      <Typography className={classes.message}>{t('清空的訊息將不再能恢復')}</Typography>
    </BasicDialog>
  )
}

ClearAllMessagesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  onClearAll: PropTypes.func.isRequired,
}
