import React from 'react'
import {useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'

import {ConnectionState} from '../../../../../../../../../../constants'
import {useWSClient} from '../../../../../../../../../../features/wsClient'
import {getConnectionState, getRequestBody} from '../../../../../../../../../../redux/selectors'
import Button from '../../../../../../../../../elements/Button'


export default function SendRequestButton() {
  const {t} = useTranslation()
  const wsClient = useWSClient()

  const requestBody = useSelector(getRequestBody)
  const connectionState = useSelector(getConnectionState)
  const isConnected = connectionState === ConnectionState.Connected

  const onClick = async () => {
    await wsClient.sendMessage(requestBody)
  }

  return (
    <Button disabled={!isConnected} onClick={onClick}>{t('送出')}</Button>
  )
}

SendRequestButton.propTypes = {}
