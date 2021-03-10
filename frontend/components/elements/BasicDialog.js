import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  root: ({size}) => {
    switch (size) {
      case 'large':
        return {
          background: theme.project.basic.dialog.background,
          borderRadius: theme.spacing(1),
          minHeight: size === 'large' ? '80%' : undefined,
          width: '100%',
        }
      default:
        return {
          background: theme.project.basic.dialog.background,
          borderRadius: theme.spacing(1),
        }
    }
  },
  header: ({size}) => {
    switch (size) {
      case 'large':
        return {
          background: theme.project.basic.dialog.header.background,
          color: theme.project.basic.dialog.header.textColor,
          fontSize: '1.5rem',
          fontWeight: 600,
        }
      default:
        return {
          background: theme.project.basic.dialog.header.background,
          color: theme.project.basic.dialog.header.textColor,
          fontSize: '1.2rem',
          fontWeight: 600,
          padding: theme.spacing(0.5),
          paddingLeft: theme.spacing(2),
        }
    }
  },
  closeButton: {
    color: theme.project.basic.dialog.header.closeButton,
  },
  content: {
    marginTop: theme.spacing(1),
  },
  actionSection: {
    padding: theme.spacing(2),
  }
}))

export default function BasicDialog({children, title, open, onClose, size, actions}) {
  const classes = useStyles({size})
  return (
    <Dialog classes={{paper: classes.root}} scroll="body" maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle disableTypography className={classes.header}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>{title}</Grid>
          <Grid item>
            <IconButton className={classes.closeButton} aria-label="close" onClick={onClose}>
              <CloseIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.content}>
        {children}
      </DialogContent>
      <DialogActions className={classes.actionSection}>
        {actions}
      </DialogActions>
    </Dialog>
  )
}
