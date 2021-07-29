import React from 'react'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import AppController from '../components/controllers/AppController'
import MainContainer from '../components/containers/main'
import AlerterProvider from '../features/alerter/AlertProvider'
import WSClientProvider from '../features/wsClient/WSClientProvider'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

export default function Index() {
  return (
    <AlerterProvider>
      <WSClientProvider>
        <AppController>
          <MainContainer/>
        </AppController>
      </WSClientProvider>
    </AlerterProvider>
  )
}
