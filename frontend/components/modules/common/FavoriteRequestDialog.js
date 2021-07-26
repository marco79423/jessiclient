import React, {useEffect, useMemo, useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid} from '@material-ui/core'
import BasicDialog from '../../elements/BasicDialog'
import {makeStyles} from '@material-ui/core/styles'
import Select from '../../elements/Select'
import FavoriteRequestItem from './FavoriteRequestItem'
import {Button} from '../../elements/Button'
import FavoriteRequestCategoryDialog from './FavoriteRequestCategoryDialog'


const useStyles = makeStyles((theme) => ({
  emptyMessage: {
    fontSize: '1.1rem',
    marginTop: theme.spacing(2)
  }
}))

export default function FavoriteRequestDialog({
                                                isConnected,
                                                open,
                                                onClose,

                                                favoriteRequestCategories,
                                                onAddFavoriteRequestCategory,
                                                onUpdatedFavoriteRequestCategory,
                                                onRemoveFavoriteRequestCategory,

                                                favoriteRequests,
                                                onRemove,
                                                onApply,
                                                onSend,
                                                onUpdate
                                              }) {
  const classes = useStyles()
  const {t} = useTranslation()
  const [currentFavoriteRequestCategoryID, setCurrentFavoriteCategoryID] = useState()
  const [favoriteRequestCategoryDialogOpen, setFavoriteRequestCategoryDialog] = useState(false)
  const [favoriteRequestCategoryDialogEditMode, setFavoriteRequestCategoryDialogEditMode] = useState(false)


  const favoriteRequestCategoryMap = useMemo(() => favoriteRequestCategories.reduce((map, favoriteRequestCategory) => ({
    ...map,
    [favoriteRequestCategory.id]: favoriteRequestCategory
  }), {}), [favoriteRequestCategories])

  const showAddFavoriteCategoryDialog = () => {
    setFavoriteRequestCategoryDialogEditMode(false)
    setFavoriteRequestCategoryDialog(true)
  }

  const showEditFavoriteCategoryDialog = () => {
    setFavoriteRequestCategoryDialogEditMode(true)
    setFavoriteRequestCategoryDialog(true)
  }

  const closeFavoriteCategoryDialog = () => {
    setFavoriteRequestCategoryDialog(false)
  }

  const confirmFavoriteCategory = (category) => {
    if (favoriteRequestCategoryDialogEditMode) {
      onUpdatedFavoriteRequestCategory({
        id: currentFavoriteRequestCategoryID,
        changes: {
          label: category,
        },
      })
    } else {
      onAddFavoriteRequestCategory({
        label: category
      })
    }
  }

  const removeFavoriteCategory = () => {
    onRemoveFavoriteRequestCategory(currentFavoriteRequestCategoryID)
  }

  const filteredSelections = useMemo(() => favoriteRequestCategories
    .map(favoriteRequestCategory => ({
      key: favoriteRequestCategory.id,
      label: favoriteRequestCategory.label,
      value: favoriteRequestCategory.id,
    })), [favoriteRequestCategories])

  const filteredFavoriteRequests = useMemo(() => favoriteRequests
      .filter(favoriteRequest => favoriteRequest.categoryID === currentFavoriteRequestCategoryID)
      .map(favoriteRequest => ({
        ...favoriteRequest,
        category: favoriteRequestCategoryMap[favoriteRequest.categoryID].label,
      })),
    [favoriteRequests, currentFavoriteRequestCategoryID])

  useEffect(() => {
    if (favoriteRequestCategories.length > 0 && !favoriteRequestCategoryMap[currentFavoriteRequestCategoryID]) {
      setCurrentFavoriteCategoryID(favoriteRequestCategories[0].id)
    }
  }, [favoriteRequestCategoryMap])

  const currentCategoryName = useMemo(() => favoriteRequestCategoryMap[currentFavoriteRequestCategoryID] ? favoriteRequestCategoryMap[currentFavoriteRequestCategoryID].label : '', [favoriteRequestCategoryMap, currentFavoriteRequestCategoryID])

  return (
    <>
      <BasicDialog title={t('常用請求列表')} autoFullScreen open={open} onClose={onClose}>
        <>
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <Select
                currentValue={currentFavoriteRequestCategoryID}
                selections={filteredSelections}
                onSelectionChange={setCurrentFavoriteCategoryID}
              />
            </Grid>
            <Grid item>
              <Grid container spacing={1}>
                <Grid item>
                  <Button onClick={showAddFavoriteCategoryDialog}>新增</Button>
                </Grid>
                <Grid item>
                  <Button onClick={showEditFavoriteCategoryDialog}>修改</Button>
                </Grid>
                <Grid item>
                  <Button
                    disabled={filteredFavoriteRequests.length > 0 || favoriteRequestCategories.length <= 1}
                    onClick={removeFavoriteCategory}>刪除</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {filteredFavoriteRequests.length > 0 ? (
            <Grid container spacing={2} justify="center">
              {filteredFavoriteRequests.map(favoriteRequest => (
                <FavoriteRequestItem
                  key={favoriteRequest.id}
                  isConnected={isConnected}
                  favoriteRequest={favoriteRequest}
                  onRemove={onRemove}
                  onApply={onApply}
                  onSend={onSend}
                  onUpdate={onUpdate}
                />
              ))}
            </Grid>
          ) : (
            <div className={classes.emptyMessage}>{t('沒有常用請求')}</div>
          )}
        </>
      </BasicDialog>

      <FavoriteRequestCategoryDialog
        editMode={favoriteRequestCategoryDialogEditMode}
        open={favoriteRequestCategoryDialogOpen}
        currentCategoryName={currentCategoryName}
        onClose={closeFavoriteCategoryDialog}
        onConfirm={confirmFavoriteCategory}
      />
    </>
  )
}

FavoriteRequestDialog.propTypes = {
  isConnected: PropTypes.bool.isRequired,

  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  favoriteRequests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,

  onRemove: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

