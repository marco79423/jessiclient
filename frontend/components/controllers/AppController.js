import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'

import {getFavoriteRequestCategories} from '../../redux/selectors'
import {addFavoriteRequestCategory} from '../../redux/project'
import generateRandomString from '../../utils/generateRandomString'
import useTracker from '../../features/tracker/useTracker'
import useAlerter from '../../features/alerter/useAlerter'
import useWSClient from '../../features/wsClient/useWSClient'
import useProjectLoader from '../../features/projectLoader/useProjectLoader'


export default function AppController({children}) {
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const tracker = useTracker()
  const alerter = useAlerter()
  const wsClient = useWSClient()
  const projectLoader = useProjectLoader()
  const favoriteRequestCategories = useSelector(getFavoriteRequestCategories)

  useEffect(() => {
    if (favoriteRequestCategories.length === 0) {
      dispatch(addFavoriteRequestCategory({
        id: generateRandomString(),
        label: t('未分類'),
      }))
    }
  }, [favoriteRequestCategories])

  const appController = {
    tracker,

    connect: wsClient.connect,
    disconnect: wsClient.disconnect,

    sendMessage: wsClient.sendMessage,

    enableScheduler: wsClient.enableScheduler,
    disableScheduler: wsClient.disableScheduler,

    exportProject: projectLoader.exportProject,
    importProject: projectLoader.importProject,
    generateShareLink: projectLoader.generateShareLink,

    throwError: alerter.throwError,
  }

  return (
    <>
      {React.cloneElement(children, {appController})}
    </>
  )
}
