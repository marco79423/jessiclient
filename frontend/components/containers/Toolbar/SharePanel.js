import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {Grid, Typography} from '@material-ui/core'

import {changeShareLink, clearShareLink} from '../../../slices/current'
import {getShareLink} from '../../../selectors'
import BasicDialog from '../../elements/BasicDialog'
import Button from '../../elements/Button'
import TextField from '../../elements/TextField'
import Checkbox from '../../elements/Checkbox'
import LinkButton from '../../elements/LinkButton'
import {makeStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  tip: {
    fontSize: '0.9rem'
  }
}))

export default function SharePanel({appController, open, onClose}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const shareLink = useSelector(getShareLink)
  const {t} = useTranslation('Toolbar')
  const [messageIncluded, setIncludeMessages] = useState(false)

  const onCopyLinkButtonClicked = async () => {
    await navigator.clipboard.writeText(shareLink)
  }

  const onGenerateLinkButtonClicked = async () => {
    try {
      const shareLink = await appController.generateShareLink({messageIncluded})
      await dispatch(changeShareLink(shareLink))
    } catch (e) {
      console.log(e)
      appController.throwError(t('產生分享連結失敗'))
    }
  }

  const onCloseButtonClick = () => {
    dispatch(clearShareLink())
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
          <Checkbox
            checked={messageIncluded}
            setChecked={setIncludeMessages}
            label={t('保留實際請求和回傳訊息')}
          />
        </Grid>
      </Grid>
    </BasicDialog>
  )
}

SharePanel.propTypes = {
  appController: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
