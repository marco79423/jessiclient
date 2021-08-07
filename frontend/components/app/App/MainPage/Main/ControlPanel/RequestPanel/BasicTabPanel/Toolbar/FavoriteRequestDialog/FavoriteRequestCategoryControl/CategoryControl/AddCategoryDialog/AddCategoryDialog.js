import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles} from '@material-ui/core'

import BasicDialog from '../../../../../../../../../../../../elements/BasicDialog'
import Button from '../../../../../../../../../../../../elements/Button'
import TextField from '../../../../../../../../../../../../elements/TextField'
import {addFavoriteRequestCategory} from '../../../../../../../../../../../../../redux/project'
import generateRandomString from '../../../../../../../../../../../../../utils/generateRandomString'
import {useDispatch} from 'react-redux'


const useStyles = makeStyles((theme) => ({
  body: {
    marginBottom: theme.spacing(1)
  },
}))

export default function AddCategoryDialog({open, onClose}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const [categoryName, setCategoryName] = useState('')

  const onCategoryChange = (value) => {
    setCategoryName(value)
  }

  const onConfirmButtonClick = async () => {
    dispatch(addFavoriteRequestCategory({
      id: generateRandomString(),
      label: categoryName,
      readonly: false,
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
      title={t('新增常用請求分類名稱')}
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

AddCategoryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
