import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles} from '@material-ui/core'

import BasicDialog from '../../elements/BasicDialog'
import Button from '../../elements/Button'
import TextField from '../../elements/TextField'


const useStyles = makeStyles((theme) => ({
  body: {
    marginBottom: theme.spacing(1)
  },
}))

export default function AddFavoriteRequestDialog({open, onClose, onCreate}) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')
  const [requestName, setRequestName] = useState('')

  const onNameChange = (value) => {
    setRequestName(value)
  }

  const onAddButtonClick = async () => {
    await onCreate(requestName)
    setRequestName('')
    onClose()
  }

  const onCloseButtonClick = async () => {
    setRequestName('')
    onClose()
  }

  return (
    <BasicDialog
      title={t('設為常用請求')}
      open={open}
      onClose={onClose}
      actions={
        <>
          <Button onClick={onCloseButtonClick}>{t('取消')}</Button>
          <Button primary disabled={!requestName} onClick={onAddButtonClick}>{t('確認')}</Button>
        </>
      }
    >
      <Grid className={classes.body} container direction="column" spacing={1}>
        <Grid item>
          <TextField placeholder={t('常用請求名稱')} value={requestName} onChange={onNameChange}/>
        </Grid>
      </Grid>
    </BasicDialog>
  )
}

AddFavoriteRequestDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
}
