import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useGA4React} from 'ga-4-react'
import {Grid} from '@material-ui/core'

import {exportProject} from '../../../slices'
import BasicDialog from '../../elements/BasicDialog'
import Button from '../../elements/Button'
import TextField from '../../elements/TextField'
import Checkbox from '../../elements/Checkbox'

export default function ExportPanel({open, onClose}) {
  const dispatch = useDispatch()
  const ga4React = useGA4React()
  const [name, setName] = useState(null)

  const [messageIncluded, setIncludeMessages] = useState(false)

  const onExportButtonClicked = () => {
    dispatch(exportProject({
      name,
      messageIncluded,
    }))

    setName(null)
    onClose()
    ga4React.gtag('event', 'export_project', {messageIncluded})
  }

  return (
    <BasicDialog title={'匯出專案'}
                 open={open}
                 onClose={onClose}
                 actions={
                   <>
                     <Button onClick={onClose}>取消</Button>
                     <Button primary onClick={onExportButtonClicked}>匯出</Button>
                   </>
                 }>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <TextField placeholder={'檔案名稱'} value={name} onChange={setName}/>
        </Grid>
        <Grid item>
          <Checkbox checked={messageIncluded} setChecked={setIncludeMessages} label={'保留實際請求和回傳訊息'}/>
        </Grid>
      </Grid>
    </BasicDialog>
  )
}
