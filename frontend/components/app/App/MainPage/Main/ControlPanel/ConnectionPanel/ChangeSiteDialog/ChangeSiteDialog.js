import React from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'

import useTracker from '../../../../../../../../features/tracker/useTracker'
import BasicDialog from '../../../../../../../../components/elements/BasicDialog'
import Button from '../../../../../../../../components/elements/Button'


const useStyles = makeStyles((theme) => ({
  message: {
    marginTop: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))


export default function ChangeSiteDialog({open, onClose}) {
  const classes = useStyles()
  const {publicRuntimeConfig} = getConfig()
  const tracker = useTracker()
  const {t} = useTranslation()

  const onConfirm = async () => {
    tracker.trace('change_site')
    window.location.href = publicRuntimeConfig.httpVersionHostUrl
  }

  return (
    <BasicDialog
      title={t('警告')}
      open={open}
      onClose={onClose}
      actions={
        <>
          <Button onClick={onClose}>{t('取消')}</Button>
          <Button primary disabled onClick={onConfirm}>{t('前往')}</Button>
        </>
      }
    >
      <Typography className={classes.message}>{t('Jessiclient 不支援使用 WS')}</Typography>
    </BasicDialog>
  )
}

ChangeSiteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
