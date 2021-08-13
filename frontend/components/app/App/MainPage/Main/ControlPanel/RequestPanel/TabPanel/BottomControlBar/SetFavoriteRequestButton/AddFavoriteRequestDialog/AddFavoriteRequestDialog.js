import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {nanoid} from 'nanoid'
import {Grid, makeStyles} from '@material-ui/core'

import BasicDialog from '../../../../../../../../../../elements/BasicDialog'
import Button from '../../../../../../../../../../elements/Button'
import TextField from '../../../../../../../../../../elements/TextField'
import Select from '../../../../../../../../../../elements/Select'
import {useDispatch, useSelector} from 'react-redux'
import {
  selectFavoriteRequestCategories,
  selectFavoriteRequestCategorySelections,
  selectRequestBody
} from '../../../../../../../../../../../redux/selectors'
import {addFavoriteRequest} from '../../../../../../../../../../../redux/project'
import {setCurrentFavoriteRequestID} from '../../../../../../../../../../../redux/current'
import useTracker from '../../../../../../../../../../../features/tracker/useTracker'


const useStyles = makeStyles((theme) => ({
  body: {
    marginBottom: theme.spacing(1)
  },
  text: {
    height: '100%',
  }
}))

export default function AddFavoriteRequestDialog({open, onClose}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const tracker = useTracker()

  const categories = useSelector(selectFavoriteRequestCategories)
  const selections = useSelector(selectFavoriteRequestCategorySelections)
  const requestBody = useSelector(selectRequestBody)

  const [requestName, setRequestName] = React.useState('')
  const [categoryID, setCategoryID] = React.useState('')

  React.useEffect(() => {
    if (categories.length > 0) {
      setCategoryID(categories[0].id)
    }
  }, [categories])

  const onNameChange = (value) => {
    setRequestName(value)
  }

  const onCategoryIDChange = (value) => {
    setCategoryID(value)
  }

  const onConfirmButtonClick = async () => {
    const favoriteRequest = {
      id: nanoid(),
      name: requestName,
      body: requestBody,
      categoryID: categoryID,
    }
    dispatch(addFavoriteRequest(favoriteRequest))
    dispatch(setCurrentFavoriteRequestID(favoriteRequest.id))
    tracker.trace('add_favorite_message')

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
          <Button primary disabled={!requestName} onClick={onConfirmButtonClick}>{t('確認')}</Button>
        </>
      }
    >
      <Grid className={classes.body} container spacing={1} alignItems="stretch">
        <Grid item>
          <TextField className={classes.text} placeholder={t('常用請求名稱')} value={requestName} onChange={onNameChange}/>
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
  onClose: PropTypes.func.isRequired,
}
