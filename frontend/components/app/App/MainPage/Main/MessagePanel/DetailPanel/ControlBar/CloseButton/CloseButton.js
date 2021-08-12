import React from 'react'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import {setSelectedMessageID} from '../../../../../../../../../redux/current'
import Button from '../../../../../../../../elements/Button'


const useStyles = makeStyles((theme) => ({
  root: {},
}))


function CloseButton() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {t} = useTranslation()


  const onClick = () => {
    dispatch(setSelectedMessageID(null))
  }

  return (
    <Button className={classes.root} onClick={onClick}>{t('關閉詳細訊息')}</Button>
  )
}

export default React.memo(CloseButton)
