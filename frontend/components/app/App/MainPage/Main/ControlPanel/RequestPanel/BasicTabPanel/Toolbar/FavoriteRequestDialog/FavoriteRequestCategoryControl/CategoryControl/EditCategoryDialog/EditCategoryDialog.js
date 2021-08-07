import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles} from '@material-ui/core'

import {updateFavoriteRequestCategory} from '../../../../../../../../../../../../../redux/project'
import BasicDialog from '../../../../../../../../../../../../elements/BasicDialog'
import Button from '../../../../../../../../../../../../elements/Button'
import TextField from '../../../../../../../../../../../../elements/TextField'
import {getCurrentFavoriteRequestCategory} from '../../../../../../../../../../../../../redux/selectors'


const useStyles = makeStyles((theme) => ({
  body: {
    marginBottom: theme.spacing(1)
  },
}))

export default function EditCategoryDialog({open, onClose}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const currentCategory = useSelector(getCurrentFavoriteRequestCategory)

  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    if (currentCategory) {
      setCategoryName(currentCategory.label)
    }
  }, [currentCategory])

  const onCategoryChange = (value) => {
    setCategoryName(value)
  }

  const onConfirmButtonClick = async () => {
    dispatch(updateFavoriteRequestCategory({
      id: currentCategory.id,
      changes: {
        label: categoryName,
      },
    }))
    setCategoryName('')
    onClose()
  }

  const onCloseButtonClick = async () => {
    setCategoryName('')
    onClose()
  }

  return (
    <BasicDialog
      title={t('編輯常用請求分類名稱')}
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

EditCategoryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
