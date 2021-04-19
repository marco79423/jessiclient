import React from 'react'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

import useMobileMode from '../components/hooks/useMobileMode'
import AppController from '../components/controllers/AppController'
import MainWebContainer from '../components/containers/web/MainWebContainer'
import MainMobileContainer from '../components/containers/mobile/MainMobileContainer'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, [
      'common',
      'Toolbar',
      'ControlPanel',
      'ListPanel',
      'DetailPanel',
    ]),
  }
})

export default function Index() {
  const mobileMode = useMobileMode()

  return (
    <AppController>
      {mobileMode ? (
        <MainMobileContainer/>
      ) : (
        <MainWebContainer/>
      )}
    </AppController>
  )
}
