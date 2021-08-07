import React from 'react'
import {useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'

import {ConnectionState} from '../../../../../../../../../../constants'
import {useWSClient} from '../../../../../../../../../../features/wsClient'
import {useAlerter} from '../../../../../../../../../../features/alerter'
import {getConnectionState, getRequestBody} from '../../../../../../../../../../redux/selectors'
import Button from '../../../../../../../../../elements/Button'


export default function SendRequestButton() {
  const {t} = useTranslation()
  const wsClient = useWSClient()
  const alerter = useAlerter()

  const connectionState = useSelector(getConnectionState)
  const requestBody = useSelector(getRequestBody)
  const isConnected = connectionState === ConnectionState.Connected

  const onClick = async () => {
    try {
      await wsClient.sendMessage(requestBody)
    } catch (e) {
      console.log(e)
      alerter.showErrorAlert(t('請求傳送失敗'))
    }
  }

  return (
    <Button
      primary
      disabled={!isConnected}
      onClick={onClick}>
      {t('送出')}
    </Button>
  )
}

SendRequestButton.propTypes = {}
