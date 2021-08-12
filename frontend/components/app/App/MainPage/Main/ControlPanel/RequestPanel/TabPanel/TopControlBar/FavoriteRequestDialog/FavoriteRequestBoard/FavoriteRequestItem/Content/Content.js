import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {useTranslation} from 'next-i18next'

import {updateFavoriteRequest} from '../../../../../../../../../../../../../redux/project'
import {selectFavoriteRequest} from '../../../../../../../../../../../../../redux/selectors'
import EditableText from '../../../../../../../../../../../../elements/EditableText'

const useStyles = makeStyles((theme) => ({

}))


export default function Content({id}) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const {t} = useTranslation()

  const favoriteRequest = useSelector(selectFavoriteRequest(id))

  const onBodyChange = (body) => {
    dispatch(updateFavoriteRequest({
      id: favoriteRequest.id,
      changes: {body}
    }))
  }

  return (
    <EditableText
      className={classes.root}
      value={favoriteRequest.body}
      setValue={onBodyChange}
      buttonLabel={t('儲存')}
    />
  )
}

Content.propTypes = {
  id: PropTypes.string.isRequired,
}
