import React from 'react'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'next-i18next'

import {showMessagePanel} from '../../../../../../../../../redux/current'
import Button from '../../../../../../../../elements/Button'


export default function CloseMessagePanelButton() {
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const onClick = () => {
    dispatch(showMessagePanel(false))
  }

  return (
    <Button onClick={onClick}>{t('關閉訊息列表')}</Button>
  )
}

CloseMessagePanelButton.propTypes = {}
