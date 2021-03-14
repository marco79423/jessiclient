import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  Button as MuiButton,
  FormControlLabel,
  Grid,
  InputBase,
  Paper,
  Switch,
  TextField,
  Toolbar as MuiToolbar
} from '@material-ui/core'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import SettingsIcon from '@material-ui/icons/Settings'
import ShareIcon from '@material-ui/icons/Share'

import {
  changeSettingMaxMessageCount,
  clearShareLink,
  exportProject,
  generateShareLink,
  getSettingMaxMessageCount,
  getShareLink,
  importProject
} from '../../slices'
import BasicDialog from '../elements/BasicDialog'
import Button from '../elements/Button'
import IconButton from '../elements/IconButton'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  shareLink: {
    paddingLeft: theme.spacing(1),
    width: 300,
  },
}))

export default function Toolbar() {
  const dispatch = useDispatch()
  const [sharePanelOpen, setSharePanel] = useState(false)
  const [exportPanelOpen, setExportPanel] = useState(false)
  const [settingsPanelOpen, setSettingsPanel] = useState(false)

  const onImportClicked = () => {
    dispatch(importProject())
  }

  const showSharePanel = () => {
    setSharePanel(true)
  }

  const hideSharePanel = () => {
    setSharePanel(false)
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
            <IconButton description={'分享'} icon={ShareIcon} onClick={showSharePanel}/>
            <IconButton description={'匯出專案'} icon={ArchiveIcon} onClick={showExportPanel}/>
            <IconButton description={'匯入專案'} icon={UnarchiveIcon} onClick={onImportClicked}/>
            <IconButton description={'匯入專案'} icon={SettingsIcon} onClick={showSettingsPanel}/>
          </MuiToolbar>
        </Grid>
      </Grid>

      <SharePanel open={sharePanelOpen} onClose={hideSharePanel}/>
      <ExportPanel open={exportPanelOpen} onClose={hideExportPanel}/>
      <SettingsPanel open={settingsPanelOpen} onClose={hideSettingsPanel}/>
    </>
  )
}


function SharePanel({open, onClose}) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const shareLink = useSelector(getShareLink)
  const [messageIncluded, setIncludeMessages] = useState(true)

  const onMessageIncludedChange = (e) => {
    setIncludeMessages(e.target.checked)
  }

  const onCopyLinkButtonClicked = async () => {
    await navigator.clipboard.writeText(shareLink)
  }

  const onGenerateLinkButtonClicked = () => {
    dispatch(generateShareLink({
      messageIncluded,
    }))
  }

  const onCloseButtonClick = () => {
    dispatch(clearShareLink())
    onClose()
  }

  const generateButton = () => {
    if (shareLink) {
      return (
        <MuiButton onClick={onCopyLinkButtonClicked}>複製連結</MuiButton>
      )
    } else {
      return (
        <MuiButton onClick={onGenerateLinkButtonClicked}>產生連結</MuiButton>
      )
    }
  }

  return (
    <BasicDialog title={'分享專案'}
                 open={open}
                 onClose={onCloseButtonClick}
                 actions={
                   <>
                     <Button onClick={onCloseButtonClick}>結束</Button>
                   </>
                 }
    >
      <Grid className={classes.shareLink} container alignItems="center" component={Paper}>
        <Grid item xs>
          <InputBase fullWidth disabled={shareLink === null} readOnly value={shareLink}/>
        </Grid>
        <Grid item>
          {generateButton()}
        </Grid>
      </Grid>
      <FormControlLabel
        style={{marginTop: 8}}
        control={<Switch checked={messageIncluded} onChange={onMessageIncludedChange}/>}
        label="包含歷史訊息"
      />
    </BasicDialog>
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
