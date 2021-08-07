import React from 'react'
import {useTranslation} from 'next-i18next'
import {useSelector} from 'react-redux'

import {ConnectionState} from '../../../../../../../../../../constants'
import {useWSClient} from '../../../../../../../../../../features/wsClient'
import {
  getConnectionState,
  getRequestBody,
  getSchedulerEnabledStatus,
  getScheduleTimeInterval
} from '../../../../../../../../../../redux/selectors'
import Button from '../../../../../../../../../elements/Button'

export default function EnableButton() {
  const {t} = useTranslation()
  const wsClient = useWSClient()

  const connectionState = useSelector(getConnectionState)
  const requestBody = useSelector(getRequestBody)
  const scheduleTimeInterval = useSelector(getScheduleTimeInterval)
  const schedulerEnabled = useSelector(getSchedulerEnabledStatus)

  const isConnected = connectionState === ConnectionState.Connected
  const validTimeInterval = +scheduleTimeInterval > 0
  const disabled = !isConnected || !validTimeInterval

  const onClick = async () => {
    if (schedulerEnabled) {
      await wsClient.disableScheduler()
    } else {
      await wsClient.enableScheduler(requestBody, scheduleTimeInterval)
    }
  }

  return (
    <Button
      primary
      disabled={disabled}
      onClick={onClick}>
      {schedulerEnabled ? t('停用') : t('啟用')}
    </Button>
  )
}

EnableButton.propTypes = {}
