import React from 'react'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

import MainContainer from '../components/containers/MainContainer'
import AppController from '../components/controllers/AppController'

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
  return (
    <AppController>
      <MainContainer/>
    </AppController>
  )
}
