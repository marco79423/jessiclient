import React, {useEffect, useMemo, useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles} from '@material-ui/core'

import BasicDialog from '../../elements/BasicDialog'
import Button from '../../elements/Button'
import TextField from '../../elements/TextField'
import Select from '../../elements/Select'


const useStyles = makeStyles((theme) => ({
  body: {
    marginBottom: theme.spacing(1)
  },
}))

export default function AddFavoriteRequestDialog({open, categories, onClose, onCreate}) {
  const classes = useStyles()
  const {t} = useTranslation()
  const [requestName, setRequestName] = useState('')
  const [categoryID, setCategoryID] = useState()  // TODO: 應該要做檢查

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryID(categories[0].id)
    }
  }, [categories])

  const selections = useMemo(() => categories.map(category => ({
    key: category.id,
    label: category.label,
    value: category.id,
  })), [categories])

  const onNameChange = (value) => {
    setRequestName(value)
  }

  const onCategoryIDChange = (value) => {
    setCategoryID(value)
  }

  const onAddButtonClick = async () => {
    await onCreate({
      name: requestName,
      categoryID: categoryID,
    })
    setRequestName('')
    onClose()
  }

  const onCloseButtonClick = async () => {
    setRequestName('')
    onClose()
  }

  return (
    <BasicDialog
      title={t('設為常用請求')}
      open={open}
      onClose={onClose}
      actions={
        <>
          <Button onClick={onCloseButtonClick}>{t('取消')}</Button>
          <Button primary disabled={!requestName} onClick={onAddButtonClick}>{t('確認')}</Button>
        </>
      }
    >
      <Grid className={classes.body} container direction="column" spacing={1}>
        <Grid item>
          <TextField placeholder={t('常用請求名稱')} value={requestName} onChange={onNameChange}/>
        </Grid>
        <Grid item>
          <Select
            currentValue={categoryID}
            selections={selections}
            onSelectionChange={onCategoryIDChange}
          />
        </Grid>
      </Grid>
    </BasicDialog>
  )
}

AddFavoriteRequestDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
}
