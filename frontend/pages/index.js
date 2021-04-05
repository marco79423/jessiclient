import React from 'react'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Application from '../components/Application'
import AppController from '../components/controllers/AppController'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'ControlPanel', 'Toolbar']),
  }
})

export default function Index() {
  return (
    <AppController>
      <Application/>
    </AppController>
  )
}
