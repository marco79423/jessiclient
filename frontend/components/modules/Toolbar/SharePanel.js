import {useDispatch, useSelector} from 'react-redux'
import {useGA4React} from 'ga-4-react'
import {clearShareLink, generateShareLink, getShareLink} from '../../../slices'
import React, {useState} from 'react'
import {Button as MuiButton, Grid, Typography} from '@material-ui/core'
import BasicDialog from '../../elements/BasicDialog'
import Button from '../../elements/Button'
import TextField from '../../elements/TextField'
import Checkbox from '../../elements/Checkbox'

export default function SharePanel({open, onClose}) {
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