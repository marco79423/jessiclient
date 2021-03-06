import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core'
import {changeSettingMaxMessageCount, getSettingMaxMessageCount} from '../../slices'
import {useDispatch, useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    width: 400,
    height: 300,
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  inputPanel: {
    display: 'flex',
    alignItems: 'center',
  },
  valueInput: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionSection: {
    paddingRight: theme.spacing(3),
  }
}))

export default function SettingsPanel({open, onClose}) {
  const classes = useStyles()
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
    <Dialog classes={{paper: classes.root}} maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle disableTypography="false" className={classes.title}>設定</DialogTitle>
      <DialogContent className={classes.inputPanel}>
        <TextField className={classes.valueInput}
                   label="最大訊息數"
                   onChange={onValueChange}
                   variant="outlined"
                   margin="dense"
                   value={value}/>
      </DialogContent>
      <DialogActions className={classes.actionSection}>
        <Button variant="contained" onClick={onClose}>取消</Button>
        <Button variant="contained" color="primary" onClick={confirm}>修改</Button>
      </DialogActions>
    </Dialog>
  )
}
