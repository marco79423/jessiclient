import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'

import useTracker from '../../../../../../../../../../features/tracker/useTracker'
import {clearMessages} from '../../../../../../../../../../redux/project'
import {clearSearchQueries, setSelectedMessageID} from '../../../../../../../../../../redux/current'
import BasicDialog from '../../../../../../../../../elements/BasicDialog'
import Button from '../../../../../../../../../elements/Button'


const useStyles = makeStyles((theme) => ({
  message: {
    marginTop: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))


export default function ClearAllMessagesDialog({open, onClose}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const tracker = useTracker()
  const {t} = useTranslation()

  const onConfirm = () => {
    tracker.trace('clear_messages')

    dispatch(clearMessages())
    dispatch(setSelectedMessageID(null))
    dispatch(clearSearchQueries())
    onClose()
  }

  return (
    <BasicDialog
      title={t('確定清空訊息嗎？')}
      open={open}
      onClose={onClose}
      actions={
        <>
          <Button onClick={onClose}>{t('取消')}</Button>
          <Button primary onClick={onConfirm}>{t('清空訊息')}</Button>
        </>
      }
    >
      <Typography className={classes.message}>{t('清空的訊息將不再能恢復')}</Typography>
    </BasicDialog>
  )
}

ClearAllMessagesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
