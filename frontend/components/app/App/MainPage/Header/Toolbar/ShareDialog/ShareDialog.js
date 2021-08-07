import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {Grid, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import {changeShareLink, clearShareLink} from '../../../../../../../redux/current'
import {getShareLink} from '../../../../../../../redux/selectors'
import {useProject} from '../../../../../../../features/project'
import useAlerter from '../../../../../../../features/alerter/useAlerter'
import BasicDialog from '../../../../../../elements/BasicDialog'
import Button from '../../../../../../elements/Button'
import TextField from '../../../../../../elements/TextField'
import Checkbox from '../../../../../../elements/Checkbox'
import LinkButton from '../../../../../../elements/LinkButton'

const useStyles = makeStyles((theme) => ({
  tip: {
    fontSize: '0.9rem'
  }
}))

export default function ShareDialog({open, onClose}) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const {t} = useTranslation()
  const project = useProject()
  const alerter = useAlerter()

  const shareLink = useSelector(getShareLink)
  const [messageIncluded, setIncludeMessages] = useState(false)

  const onCopyLinkButtonClick = async () => {
    await navigator.clipboard.writeText(shareLink)
  }

  const onGenerateLinkButtonClick = async () => {
    try {
      const shareLink = await project.generateShareLink({messageIncluded})
      await dispatch(changeShareLink(shareLink))
    } catch (e) {
      console.log(e)
      alerter.showErrorAlert(t('產生分享連結失敗'))
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
                <LinkButton onClick={onCopyLinkButtonClick}>{t('複製連結')}</LinkButton>
              ) : (
                <LinkButton onClick={onGenerateLinkButtonClick}>{t('產生連結')}</LinkButton>
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

ShareDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
