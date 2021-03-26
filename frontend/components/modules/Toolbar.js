import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useGA4React} from 'ga-4-react'
import {Button as MuiButton, Grid, Toolbar as MuiToolbar, Typography} from '@material-ui/core'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import ShareIcon from '@material-ui/icons/Share'

import {clearShareLink, exportProject, generateShareLink, getShareLink, importProject} from '../../slices'
import BasicDialog from '../elements/BasicDialog'
import Button from '../elements/Button'
import IconButton from '../elements/IconButton'
import Checkbox from '../elements/Checkbox'
import TextField from '../elements/TextField'

export default function Toolbar() {
  const dispatch = useDispatch()
  const ga4React = useGA4React()
  const [sharePanelOpen, setSharePanel] = useState(false)
  const [exportPanelOpen, setExportPanel] = useState(false)

  const onImportClicked = () => {
    dispatch(importProject())
    ga4React.gtag('event', 'import_project')
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

  return (
    <>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <MuiToolbar>
            <IconButton description={'分享'} icon={ShareIcon} onClick={showSharePanel}/>
            <IconButton description={'匯出專案'} icon={ArchiveIcon} onClick={showExportPanel}/>
            <IconButton description={'匯入專案'} icon={UnarchiveIcon} onClick={onImportClicked}/>
          </MuiToolbar>
        </Grid>
      </Grid>

      <SharePanel open={sharePanelOpen} onClose={hideSharePanel}/>
      <ExportPanel open={exportPanelOpen} onClose={hideExportPanel}/>
    </>
  )
}


function SharePanel({open, onClose}) {
  const dispatch = useDispatch()
  const ga4React = useGA4React()
  const shareLink = useSelector(getShareLink)
  const [messageIncluded, setIncludeMessages] = useState(false)

  const onCopyLinkButtonClicked = async () => {
    await navigator.clipboard.writeText(shareLink)
    ga4React.gtag('event', 'copy_share_link')
  }

  const onGenerateLinkButtonClicked = () => {
    dispatch(generateShareLink({
      messageIncluded,
    }))
    ga4React.gtag('event', 'generate_share_link', {messageIncluded})
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
                   <Button onClick={onCloseButtonClick}>結束</Button>
                 }
    >
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography style={{fontSize: '0.8rem'}}>產生的連結將保留 7 天</Typography>
        </Grid>
        <Grid item>
          <TextField
            disabled={shareLink === null}
            readOnly
            value={shareLink}
            action={generateButton()}/>
        </Grid>
        <Grid item>
          <Checkbox checked={messageIncluded} setChecked={setIncludeMessages} label={'保留實際請求和回傳訊息'}/>
        </Grid>
      </Grid>
    </BasicDialog>
  )
}

function ExportPanel({open, onClose}) {
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
