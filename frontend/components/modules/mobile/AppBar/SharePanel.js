import React, {useState} from 'react'
import {useTranslation} from 'next-i18next'
import {Grid, Typography} from '@material-ui/core'

import BasicDialog from '../../../elements/BasicDialog'
import Button from '../../../elements/Button'
import TextField from '../../../elements/TextField'
import Checkbox from '../../../elements/Checkbox'
import LinkButton from '../../../elements/LinkButton'
import {makeStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  tip: {
    fontSize: '0.9rem'
  }
}))

export default function SharePanel({open, onClose, shareLink, generateShareLink}) {
  const classes = useStyles()
  const {t} = useTranslation('Toolbar')
  const [messageIncluded, setIncludeMessages] = useState(false)

  const onCopyLinkButtonClicked = async () => {
    await navigator.clipboard.writeText(shareLink)
  }

  const onGenerateLinkButtonClicked = async () => {
    await generateShareLink({messageIncluded})
  }

  const onCloseButtonClick = () => {
    onClose()
  }

  return (
    <BasicDialog
      title={t('分享專案')}
      open={open}
      onClose={onCloseButtonClick}
      actions={<Button onClick={onCloseButtonClick}>{t('結束')}</Button>}
    >
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography className={classes.tip}>{t('產生的連結將保留 7 天')}</Typography>
        </Grid>
        <Grid item>
          <TextField
            disabled={!shareLink}
            readOnly
            value={shareLink}
            action={
              shareLink ? (
                <LinkButton onClick={onCopyLinkButtonClicked}>{t('複製連結')}</LinkButton>
              ) : (
                <LinkButton onClick={onGenerateLinkButtonClicked}>{t('產生連結')}</LinkButton>
              )
            }
          />
        </Grid>
        <Grid item>
          {!shareLink ? (
            <Checkbox
              checked={messageIncluded}
              setChecked={setIncludeMessages}
              label={t('保留實際請求和回傳訊息')}
            />
          ) : null}
        </Grid>
      </Grid>
    </BasicDialog>
  )
}

SharePanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  shareLink: PropTypes.string.isRequired,
  generateShareLink: PropTypes.func.isRequired,
}
