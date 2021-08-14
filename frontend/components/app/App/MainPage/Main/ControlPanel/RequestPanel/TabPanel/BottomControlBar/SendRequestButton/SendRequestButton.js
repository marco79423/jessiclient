import React from 'react'
import {useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {useWSClient} from '../../../../../../../../../../features/wsClient'
import {selectRequestBody} from '../../../../../../../../../../redux/selectors'
import Button from '../../../../../../../../../elements/Button'


export default function SendRequestButton() {
  const {t} = useTranslation()
  const wsClient = useWSClient()

  const requestBody = useSelector(selectRequestBody)

  const onClick = async () => {
    await wsClient.sendMessage(requestBody)
  }

  return (
    <Button disabled={!wsClient.isConnected} onClick={onClick}>{t('送出')}</Button>
  )
}

SendRequestButton.propTypes = {}
