import React, {useRef} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
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

export default function ModifyDialog({title, defaultValue, onConfirm, open, onClose}) {
  const classes = useStyles()
  const valueInputRef = useRef()

  return (
    <Dialog classes={{paper: classes.root}} maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle disableTypography="false" className={classes.title}>{title}</DialogTitle>
      <DialogContent className={classes.inputPanel}>
        <TextField className={classes.valueInput}
                   inputRef={valueInputRef}
                   variant="outlined"
                   margin="dense"
                   placeholder={defaultValue}/>
      </DialogContent>
      <DialogActions className={classes.actionSection}>
        <Button variant="contained" onClick={onClose}>取消</Button>
        <Button variant="contained" color="primary" onClick={() => onConfirm(valueInputRef.current.value)}>修改</Button>
      </DialogActions>
    </Dialog>
  )
}
