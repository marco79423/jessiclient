import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

import {
  selectCurrentFavoriteRequestCategory,
  selectFavoriteRequestCategories,
  selectFilteredFavoriteRequestIDs
} from '../../../../../../../../../../../../redux/selectors'
import {setCurrencyFavoriteCategoryID} from '../../../../../../../../../../../../redux/current'
import {removeFavoriteRequestCategory} from '../../../../../../../../../../../../redux/project'
import Button from '../../../../../../../../../../../elements/Button'
import AddCategoryDialog from './AddCategoryDialog'
import EditCategoryDialog from './EditCategoryDialog'
import {useTranslation} from 'next-i18next'


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 220,
  },
}))

export default function CategoryControl() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const {t} = useTranslation()

  const favoriteRequestCategories = useSelector(selectFavoriteRequestCategories)
  const filteredFavoriteRequestIDs = useSelector(selectFilteredFavoriteRequestIDs)
  const currentCategory = useSelector(selectCurrentFavoriteRequestCategory)

  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = React.useState(false)
  const [editCategoryDialogOpen, setEditCategoryDialogOpen] = React.useState(false)

  const removeButtonDisabled = (
    !currentCategory ||                          // 可能還不存在
    filteredFavoriteRequestIDs.length > 0 ||     // 如果最愛的 Request 不是空的
    favoriteRequestCategories.length <= 1 ||     // 如果是唯一的分類
    currentCategory.readonly                     // 如果是唯讀的分類
  )

  const onAddButtonClick = () => {
    setAddCategoryDialogOpen(true)
  }


  const onEditButtonClick = () => {
    setEditCategoryDialogOpen(true)
  }

  const onRemoveButtonClick = () => {
    dispatch(removeFavoriteRequestCategory(currentCategory.id))
    dispatch(setCurrencyFavoriteCategoryID(null))
  }

  const hideAddFavoriteCategoryDialog = () => {
    setAddCategoryDialogOpen(false)
  }

  const hideEditFavoriteCategoryDialog = () => {
    setEditCategoryDialogOpen(false)
  }

  return (
    <>
      <Grid className={classes.root} container spacing={1}>
        <Grid item>
          <Button onClick={onAddButtonClick}>{t('新增')}</Button>
        </Grid>
        <Grid item>
          <Button onClick={onEditButtonClick}>{t('修改')}</Button>
        </Grid>
        <Grid item>
          <Button disabled={removeButtonDisabled} onClick={onRemoveButtonClick}>{t('刪除')}</Button>
        </Grid>
      </Grid>

      <AddCategoryDialog
        open={addCategoryDialogOpen}
        onClose={hideAddFavoriteCategoryDialog}
      />

      <EditCategoryDialog
        open={editCategoryDialogOpen}
        onClose={hideEditFavoriteCategoryDialog}
      />
    </>
  )
}

CategoryControl.propTypes = {}

