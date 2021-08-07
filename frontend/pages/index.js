import React from 'react'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

import App from '../components/app/App'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

export default function Index() {
  return (
    <App/>
  )
}
