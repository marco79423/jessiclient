import React from 'react'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import {showMessagePanel} from '../../../../../../../redux/current'
import Button from '../../../../../../elements/Button'


const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'right',
  },
}))

export default function ControlBar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const onShowListPanel = () => {
    dispatch(showMessagePanel(true))
  }

  return (
    <div className={classes.root}>
      <Button onClick={onShowListPanel}>{t('展開訊息列表')}</Button>
    </div>
  )
}

ControlBar.propTypes = {}
