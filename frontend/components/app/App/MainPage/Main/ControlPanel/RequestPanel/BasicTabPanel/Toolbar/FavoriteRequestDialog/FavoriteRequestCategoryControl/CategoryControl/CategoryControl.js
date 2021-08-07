import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Grid} from '@material-ui/core'

import {
  getCurrentFavoriteRequestCategory,
  getFavoriteRequestCategories,
  getFilteredFavoriteRequests
} from '../../../../../../../../../../../../redux/selectors'
import {setCurrencyFavoriteCategoryID} from '../../../../../../../../../../../../redux/current'
import {removeFavoriteRequestCategory} from '../../../../../../../../../../../../redux/project'
import AddCategoryDialog from './AddCategoryDialog'
import EditCategoryDialog from './EditCategoryDialog'
import Button from '../../../../../../../../../../../elements/Button'


export default function CategoryControl() {
  const dispatch = useDispatch()

  const favoriteRequestCategories = useSelector(getFavoriteRequestCategories)
  const filteredFavoriteRequests = useSelector(getFilteredFavoriteRequests)
  const currentCategory = useSelector(getCurrentFavoriteRequestCategory)

  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = React.useState(false)
  const [editCategoryDialogOpen, setEditCategoryDialogOpen] = React.useState(false)

  const showAddFavoriteCategoryDialog = () => {
    setAddCategoryDialogOpen(true)
  }

  const hideAddFavoriteCategoryDialog = () => {
    setAddCategoryDialogOpen(false)
  }

  const showUpdateFavoriteCategoryDialog = () => {
    setEditCategoryDialogOpen(true)
  }

  const hideEditFavoriteCategoryDialog = () => {
    setEditCategoryDialogOpen(false)
  }

  const removeFavoriteCategory = () => {
    dispatch(removeFavoriteRequestCategory(currentCategory.id))
    dispatch(setCurrencyFavoriteCategoryID(null))
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item>
          <Button onClick={showAddFavoriteCategoryDialog}>新增</Button>
        </Grid>
        <Grid item>
          <Button onClick={showUpdateFavoriteCategoryDialog}>修改</Button>
        </Grid>
        <Grid item>
          <Button
            disabled={filteredFavoriteRequests.length > 0 || favoriteRequestCategories.length <= 1 || currentCategory.readonly}
            onClick={removeFavoriteCategory}
          >刪除</Button>
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

