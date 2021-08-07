import React from 'react'

import {useI18n} from '../../../../../../../features/i18n'
import Select from '../../../../../../elements/Select'


export default function LocaleSelect({className}) {
  const i18n = useI18n()

  return (
    <Select
      className={className}
      currentValue={i18n.currentLangCode}
      selections={i18n.locales}
      onSelectionChange={i18n.onLocaleChange}
    />
  )
}

