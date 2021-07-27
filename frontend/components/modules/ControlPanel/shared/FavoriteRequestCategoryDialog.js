import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles} from '@material-ui/core'

import BasicDialog from '../../../elements/BasicDialog'
import Button from '../../../elements/Button'
import TextField from '../../../elements/TextField'


const useStyles = makeStyles((theme) => ({
  body: {
    marginBottom: theme.spacing(1)
  },
}))

export default function FavoriteRequestCategoryDialog({editMode, currentCategoryName, open, onClose, onConfirm}) {
  const classes = useStyles()
  const {t} = useTranslation()
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    if (editMode) {
      setCategoryName(currentCategoryName)
    } else {
      setCategoryName('')
    }
  }, [editMode, currentCategoryName])

  const onCategoryChange = (value) => {
    setCategoryName(value)
  }

  const onConfirmButtonClick = async () => {
    await onConfirm(categoryName)
    setCategoryName('')
    onClose()
  }

  const onCloseButtonClick = async () => {
    setCategoryName('')
    onClose()
  }

  return (
    <BasicDialog
      title={editMode ? t('編輯常用請求分類名稱') : t('新增常用請求分類名稱')}
      open={open}
      onClose={onClose}
      actions={
        <>
          <Button onClick={onCloseButtonClick}>{t('取消')}</Button>
          <Button primary disabled={!categoryName} onClick={onConfirmButtonClick}>{t('確認')}</Button>
        </>
      }
    >
      <Grid className={classes.body} container direction="column" spacing={1}>
        <Grid item>
          <TextField placeholder={t('常用請求名稱分類')} value={categoryName} onChange={onCategoryChange}/>
        </Grid>
      </Grid>
    </BasicDialog>
  )
}

FavoriteRequestCategoryDialog.propTypes = {
  currentCategoryName: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}
