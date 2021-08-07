import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import {changeRequestBody} from '../../../../../../../../../redux/project'
import {setCurrentFavoriteRequestID} from '../../../../../../../../../redux/current'
import {getRequestBody} from '../../../../../../../../../redux/selectors'
import TextArea from '../../../../../../../../elements/TextArea'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
}))


export default function RequestBody() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const requestBody = useSelector(getRequestBody)

  const onRequestBodyChange = (value) => {
    dispatch(changeRequestBody(value))
    dispatch(setCurrentFavoriteRequestID(null))
  }

  return (
    <div className={classes.root}>
      <TextArea
        label={t('請求內容')}
        value={requestBody}
        onChange={onRequestBodyChange}
      />
    </div>
  )
}

RequestBody.propTypes = {}
