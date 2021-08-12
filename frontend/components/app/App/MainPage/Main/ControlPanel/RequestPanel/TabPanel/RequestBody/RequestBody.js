import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import {changeRequestBody} from '../../../../../../../../../redux/project'
import {setCurrentFavoriteRequestID} from '../../../../../../../../../redux/current'
import {selectRequestBody} from '../../../../../../../../../redux/selectors'
import TextArea from '../../../../../../../../elements/TextArea'


const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 350,
    maxWidth: 500,
  },
}))


export default function RequestBody() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const requestBody = useSelector(selectRequestBody)

  const onChange = (value) => {
    dispatch(changeRequestBody(value))
    dispatch(setCurrentFavoriteRequestID(null))
  }

  return (
    <TextArea
      className={classes.root}
      label={t('請求內容')}
      value={requestBody}
      onChange={onChange}
    />
  )
}

RequestBody.propTypes = {}
