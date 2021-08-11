import React from 'react'
import {useDispatch} from 'react-redux'
import {nanoid} from 'nanoid'
import {useTranslation} from 'next-i18next'

import {makeStyles} from '@material-ui/core/styles'
import {addSearchQuery} from '../../../../../../../../../redux/current'
import SearchField from '../../../../../../../../elements/SearchField'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  },
}))


export default function MessageSearch() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const onClick = (value) => {
    dispatch(addSearchQuery({
      id: nanoid(),
      value: value,
    }))
  }

  return (
    <SearchField
      className={classes.root}
      placeholder={t('搜尋訊息')}
      onSearch={onClick}
      buttonLabel={t('搜尋')}
    />
  )
}

MessageSearch.propTypes = {}
