import React from 'react'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

import useMobileMode from '../components/hooks/useMobileMode'
import AppController from '../components/controllers/AppController'
import MainContainer from '../components/containers/main'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

export default function Index() {
  const mobileMode = useMobileMode()

  return (
    <AppController>
      <MainContainer/>
    </AppController>
  )
}
