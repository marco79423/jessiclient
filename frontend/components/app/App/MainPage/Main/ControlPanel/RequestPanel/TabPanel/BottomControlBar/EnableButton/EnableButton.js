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

  const onEnableButtonClick = async () => {
    await wsClient.enableScheduler(requestBody, scheduleTimeInterval)
  }

  const onDisableButtonClick = async () => {
    await wsClient.disableScheduler()
  }

  return (
    schedulerEnabled ? (
      <Button onClick={onDisableButtonClick}>{t('停用')}</Button>
    ) : (
      <Button disabled={!isConnected || !validTimeInterval} onClick={onEnableButtonClick}>{t('啟用')}</Button>
    )
  )
}

EnableButton.propTypes = {}
