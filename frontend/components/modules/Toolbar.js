import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Grid, TextField, Toolbar as MuiToolbar} from '@material-ui/core'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import SettingsIcon from '@material-ui/icons/Settings'
import ShareIcon from '@material-ui/icons/Share'

import {changeSettingMaxMessageCount, exportProject, getSettingMaxMessageCount, importProject} from '../../slices'
import BasicDialog from '../elements/BasicDialog'
import Button from '../elements/Button'
import IconButton from '../elements/IconButton'


export default function Toolbar() {
  const dispatch = useDispatch()
  const [settingsPanelOpen, setSettingsPanel] = useState(false)
  const [exportPanelOpen, setExportPanel] = useState(false)

  const onImportClicked = () => {
    dispatch(importProject())
  }

  const showExportPanel = () => {
    setExportPanel(true)
  }

  const hideExportPanel = () => {
    setExportPanel(false)
  }

  const showSettingsPanel = () => {
    setSettingsPanel(true)
  }

  const hideSettingsPanel = () => {
    setSettingsPanel(false)
  }

  return (
    <>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <MuiToolbar>
            <IconButton style={{visibility: 'hidden'}} description={'分享'} icon={ShareIcon} onClick={showSettingsPanel}/>
            <IconButton description={'匯出專案'} icon={ArchiveIcon} onClick={showExportPanel}/>
            <IconButton description={'匯入專案'} icon={UnarchiveIcon} onClick={onImportClicked}/>
            <IconButton description={'匯入專案'} icon={SettingsIcon} onClick={showSettingsPanel}/>
          </MuiToolbar>
        </Grid>
      </Grid>

      <ExportPanel open={exportPanelOpen} onClose={hideExportPanel}/>
      <SettingsPanel open={settingsPanelOpen} onClose={hideSettingsPanel}/>
    </>
  )
}

function ExportPanel({open, onClose}) {
  const dispatch = useDispatch()
  const [name, setName] = useState(null)

  const confirm = () => {
    dispatch(exportProject({
      name: name,
    }))
    onClose()
  }

  const onNameValueChange = (e) => {
    setName(e.target.value)
  }

  return (
    <BasicDialog title={'匯出專案'}
                 open={open}
                 onClose={onClose}
                 actions={
                   <>
                     <Button onClick={onClose}>取消</Button>
                     <Button primary onClick={confirm}>匯出</Button>
                   </>
                 }
    >

      <TextField label="檔案名稱"
                 onChange={onNameValueChange}
                 margin="dense"
                 value={name}/>
    </BasicDialog>
  )
}


function SettingsPanel({open, onClose}) {
  const dispatch = useDispatch()
  const [value, setValue] = useState(null)
  const maxMessageCount = useSelector(getSettingMaxMessageCount)

  useEffect(() => {
    setValue(maxMessageCount)
  }, [maxMessageCount])

  const confirm = () => {
    dispatch(changeSettingMaxMessageCount(value))
    onClose()
  }

  const onValueChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <BasicDialog title={'設定'}
                 open={open}
                 onClose={onClose}
                 actions={
                   <>
                     <Button onClick={onClose}>取消</Button>
                     <Button primary onClick={confirm}>修改</Button>
                   </>
                 }
    >

      <TextField label="最大訊息數"
                 onChange={onValueChange}
                 margin="dense"
                 value={value}/>
    </BasicDialog>
  )
}
