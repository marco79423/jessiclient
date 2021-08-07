import React from 'react'
import getConfig from 'next/config'
import {useTranslation} from 'next-i18next'
import {useRouter} from 'next/router'

export default function useI18n() {
  const {publicRuntimeConfig} = getConfig()
  const {i18n} = useTranslation()
  const router = useRouter()

  const locales = React.useMemo(() => publicRuntimeConfig.locales.map(locale => ({
    key: locale.langCode,
    label: locale.label,
    value: locale.langCode,
  })), [publicRuntimeConfig.locales])

  const onLocaleChange = async (value) => {
    await router.replace('/', '/', {locale: value})
  }

  return {
    currentLangCode: i18n.language,

    locales: locales,
    onLocaleChange: onLocaleChange,
  }
}
