import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid} from '@material-ui/core'

import BasicDialog from '../../../../../../elements/BasicDialog'
import Button from '../../../../../../elements/Button'
import TextField from '../../../../../../elements/TextField'
import Checkbox from '../../../../../../elements/Checkbox'
import {useProject} from '../../../../../../../features/project'


export default function ExportDialog({open, onClose}) {
  const {t} = useTranslation()
  const project = useProject()

  const [filename, setFilename] = React.useState('')
  const [messageIncluded, setIncludeMessages] = React.useState(false)

  const onExportButtonClick = async () => {
    await project.exportProject({filename, messageIncluded})
    onClose()
  }

  return (
    <BasicDialog
      title={t('匯出專案')}
      open={open}
      onClose={onClose}
      actions={
        <>
          <Button onClick={onClose}>{t('取消')}</Button>
          <Button primary disabled={!filename} onClick={onExportButtonClick}>{t('匯出')}</Button>
        </>
      }
    >
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <TextField placeholder={t('檔案名稱')} value={filename} onChange={setFilename}/>
        </Grid>
        <Grid item>
          <Checkbox checked={messageIncluded} setChecked={setIncludeMessages} label={t('保留實際請求和回傳訊息')}/>
        </Grid>
      </Grid>
    </BasicDialog>
  )
}

ExportDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
