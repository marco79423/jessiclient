import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button as MuiButton, Grid, InputBase, Paper, Toolbar as MuiToolbar} from '@material-ui/core'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import ShareIcon from '@material-ui/icons/Share'

import {clearShareLink, exportProject, generateShareLink, getShareLink, importProject} from '../../slices'
import BasicDialog from '../elements/BasicDialog'
import Button from '../elements/Button'
import IconButton from '../elements/IconButton'
import {makeStyles} from '@material-ui/core/styles'
import Switch from '../elements/Switch'
import TextField from '../elements/TextField'

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
  const classes = useStyles()
  const dispatch = useDispatch()
  const shareLink = useSelector(getShareLink)
  const [messageIncluded, setIncludeMessages] = useState(true)

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
                   <Button onClick={onCloseButtonClick}>結束</Button>
                 }
    >
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid className={classes.shareLink} container alignItems="center" component={Paper}>
            <Grid item xs>
              <InputBase fullWidth disabled={shareLink === null} readOnly value={shareLink}/>
            </Grid>
            <Grid item>
              {generateButton()}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Switch checked={messageIncluded} setChecked={setIncludeMessages} label={'是否包含歷史訊息'}/>
        </Grid>
      </Grid>
    </BasicDialog>
  )
}

function ExportPanel({open, onClose}) {
  const dispatch = useDispatch()
  const [name, setName] = useState(null)

  const [messageIncluded, setIncludeMessages] = useState(true)

  const onExportButtonClicked = () => {
    dispatch(exportProject({
      name,
      messageIncluded,
    }))

    setName(null)
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
          <Switch checked={messageIncluded} setChecked={setIncludeMessages} label={'是否包含歷史訊息'}/>
        </Grid>
      </Grid>
    </BasicDialog>
  )
}
