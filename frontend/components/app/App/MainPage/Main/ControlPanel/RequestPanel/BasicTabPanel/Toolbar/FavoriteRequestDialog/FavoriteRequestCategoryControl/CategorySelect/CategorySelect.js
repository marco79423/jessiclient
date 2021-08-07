import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getCurrencyFavoriteCategoryID, getFavoriteRequestCategories} from '../../../../../../../../../../../../redux/selectors'
import {setCurrencyFavoriteCategoryID} from '../../../../../../../../../../../../redux/current'
import Select from '../../../../../../../../../../../elements/Select'


export default function CategorySelect() {
  const dispatch = useDispatch()

  const categories = useSelector(getFavoriteRequestCategories)
  const currentCategoryID = useSelector(getCurrencyFavoriteCategoryID)

  const selections = React.useMemo(() => categories
    .map(favoriteRequestCategory => ({
      key: favoriteRequestCategory.id,
      label: favoriteRequestCategory.label,
      value: favoriteRequestCategory.id,
    })), [categories])

  useEffect(() => {
    if (!currentCategoryID && categories.length > 0) {
      dispatch(setCurrencyFavoriteCategoryID(categories[0].id))
    }
  }, [currentCategoryID])

  const onFavoriteCategoryChange = (id) => {
    dispatch(setCurrencyFavoriteCategoryID(id))
  }

  return (
    <Select
      currentValue={currentCategoryID}
      selections={selections}
      onSelectionChange={onFavoriteCategoryChange}
    />
  )
}

CategorySelect.propTypes = {}

