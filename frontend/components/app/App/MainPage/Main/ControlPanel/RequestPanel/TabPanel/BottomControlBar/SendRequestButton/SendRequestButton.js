import React from 'react'
import {useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'

import {ConnectionState} from '../../../../../../../../../../constants'
import {useWSClient} from '../../../../../../../../../../features/wsClient'
import {selectConnectionState, selectRequestBody} from '../../../../../../../../../../redux/selectors'
import Button from '../../../../../../../../../elements/Button'


export default function SendRequestButton() {
  const {t} = useTranslation()
  const wsClient = useWSClient()

  const requestBody = useSelector(selectRequestBody)
  const connectionState = useSelector(selectConnectionState)
  const isConnected = connectionState === ConnectionState.Connected

  const onClick = async () => {
    await wsClient.sendMessage(requestBody)
  }

  return (
    <Button disabled={!isConnected} onClick={onClick}>{t('送出')}</Button>
  )
}

SendRequestButton.propTypes = {}
