import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {useTranslation} from 'next-i18next'
import {Grid} from '@material-ui/core'

import {updateFavoriteRequest} from '../../../../../../../../../../../../../redux/project'
import {
  selectFavoriteRequest,
  selectFavoriteRequestCategorySelections
} from '../../../../../../../../../../../../../redux/selectors'
import EditableText from '../../../../../../../../../../../../elements/EditableText'
import Select from '../../../../../../../../../../../../elements/Select'

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontSize: '1.2rem',
  },
  category: {
    fontSize: '1.1rem',
  },
}))


export default function Header({id}) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const {t} = useTranslation()

  const favoriteRequest = useSelector(selectFavoriteRequest(id))
  const selections = useSelector(selectFavoriteRequestCategorySelections)

  const onNameChange = (name) => {
    dispatch(updateFavoriteRequest({
      id: favoriteRequest.id,
      changes: {name}
    }))
  }

  const onCategoryChange = (categoryID) => {
    dispatch(updateFavoriteRequest({
      id: favoriteRequest.id,
      changes: {categoryID}
    }))
  }

  return (
    <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
      <Grid item xs={8}>
        <EditableText
          className={classes.title}
          value={favoriteRequest.name}
          setValue={onNameChange}
          buttonLabel={t('儲存')}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          currentValue={favoriteRequest.categoryID}
          selections={selections}
          onSelectionChange={onCategoryChange}
        />
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  id: PropTypes.string.isRequired,
}
