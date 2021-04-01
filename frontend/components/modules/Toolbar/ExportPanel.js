import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {useGA4React} from 'ga-4-react'
import {Grid} from '@material-ui/core'

import {downloadJsonData} from '../../../utils/jsDownloader'
import BasicDialog from '../../elements/BasicDialog'
import Button from '../../elements/Button'
import TextField from '../../elements/TextField'
import Checkbox from '../../elements/Checkbox'
import {getProjectData, getProjectDataWithoutMessages} from '../../../selectors'

export default function ExportPanel({open, onClose}) {
  const ga4React = useGA4React()
  const projectData = useSelector(getProjectData)
  const projectDataWithoutMessages = useSelector(getProjectDataWithoutMessages)

  const [name, setName] = useState(null)
  const [messageIncluded, setIncludeMessages] = useState(false)

  const onExportButtonClicked = () => {
    downloadJsonData(name, messageIncluded ? projectData : projectDataWithoutMessages)
    setName(null)
    ga4React.gtag('event', 'export_project', {messageIncluded})

    onClose()
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
