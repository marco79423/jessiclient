import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {nanoid} from 'nanoid'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles} from '@material-ui/core'

import {addFavoriteRequestCategory} from '../../../../../../../../../../../../../redux/project'
import BasicDialog from '../../../../../../../../../../../../elements/BasicDialog'
import Button from '../../../../../../../../../../../../elements/Button'
import TextField from '../../../../../../../../../../../../elements/TextField'


const useStyles = makeStyles((theme) => ({
  body: {
    marginBottom: theme.spacing(1)
  },
}))

export default function AddCategoryDialog({open, onClose}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const [categoryName, setCategoryName] = React.useState('')

  const onCategoryChange = (value) => {
    setCategoryName(value)
  }

  const onConfirmButtonClick = async () => {
    dispatch(addFavoriteRequestCategory({
      id: nanoid(),
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
      title={t('新增常用請求分類')}
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
          <TextField placeholder={t('分類名稱')} value={categoryName} onChange={onCategoryChange}/>
        </Grid>
      </Grid>
    </BasicDialog>
  )
}

AddCategoryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
