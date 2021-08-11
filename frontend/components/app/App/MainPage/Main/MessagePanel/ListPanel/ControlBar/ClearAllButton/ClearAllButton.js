import React from 'react'
import {useTranslation} from 'next-i18next'

import Button from '../../../../../../../../elements/Button'
import ClearAllMessagesDialog from './ClearAllMessagesDialog'


export default function ClearAllButton() {
  const {t} = useTranslation()

  const [clearAllDialogOn, setClearAllDialog] = React.useState(false)

  const showClearAllDialog = () => {
    setClearAllDialog(true)
  }

  const hideClearAllDialog = () => {
    setClearAllDialog(false)
  }

  return (
    <>
      <Button onClick={showClearAllDialog}>{t('清空訊息')}</Button>

      <ClearAllMessagesDialog
        open={clearAllDialogOn}
        onClose={hideClearAllDialog}
      />
    </>
  )
}

ClearAllButton.propTypes = {}
