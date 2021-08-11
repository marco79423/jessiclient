import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {
  getCurrencyFavoriteCategoryID,
  getFavoriteRequestCategorySelections
} from '../../../../../../../../../../../../redux/selectors'
import {setCurrencyFavoriteCategoryID} from '../../../../../../../../../../../../redux/current'
import Select from '../../../../../../../../../../../elements/Select'


export default function CategorySelect() {
  const dispatch = useDispatch()

  const selections = useSelector(getFavoriteRequestCategorySelections)
  const currentCategoryID = useSelector(getCurrencyFavoriteCategoryID)

  useEffect(() => {
    if (!currentCategoryID && selections.length > 0) {
      dispatch(setCurrencyFavoriteCategoryID(selections[0].value))
    }
  }, [currentCategoryID])

  const onSelectionChange = (id) => {
    dispatch(setCurrencyFavoriteCategoryID(id))
  }

  return (
    <Select
      currentValue={currentCategoryID}
      selections={selections}
      onSelectionChange={onSelectionChange}
    />
  )
}

CategorySelect.propTypes = {}

