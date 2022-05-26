import React from 'react'
import {useTranslation} from 'next-i18next'
import {useRouter} from 'next/router'

import * as config from '../../config'

export default function useI18n() {
  const {i18n} = useTranslation()
  const router = useRouter()

  const locales = React.useMemo(() => config.Locales.map(locale => ({
    key: locale.langCode,
    label: locale.label,
    value: locale.langCode,
  })), [])

  const onLocaleChange = async (value) => {
    await router.replace('/', '/', {locale: value})
  }

  return {
    currentLangCode: i18n.language,

    locales: locales,
    onLocaleChange: onLocaleChange,
  }
}
