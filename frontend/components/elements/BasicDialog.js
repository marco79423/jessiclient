import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.elements.basicDialog.background,
    borderRadius: theme.spacing(1),
  },
  header: {
    background: theme.project.elements.basicDialog.header.background,
    color: theme.project.elements.basicDialog.header.textColor,
    fontSize: '1.2rem',
    fontWeight: 600,
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
  },
  closeButton: {
    color: theme.project.elements.basicDialog.header.closeButton,
  },
  content: {
    marginTop: theme.spacing(1),
  },
  actionSection: {
    padding: theme.spacing(2),
    paddingTop: 0,
  }
}))

export default function BasicDialog({children, autoFullScreen, title, open, onClose, actions}) {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      classes={{paper: classes.root}}
      fullScreen={autoFullScreen && fullScreen}
      scroll="body"
      maxWidth="md"
      open={open}
      onClose={onClose}
    >
      <Grid container direction="column">
        {/*Title*/}
        <Grid item>
          <DialogTitle disableTypography className={classes.header}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>{title}</Grid>
              <Grid item>
                <IconButton className={classes.closeButton} aria-label="close" onClick={onClose}>
                  <CloseIcon/>
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
        </Grid>

        {/*Content*/}
        <Grid item xs>
          <DialogContent className={classes.content}>
            {children}
          </DialogContent>
        </Grid>

        {/*Actions*/}
        <Grid item>
          <DialogActions className={classes.actionSection}>
            {actions}
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  )
}

BasicDialog.propTypes = {
  children: PropTypes.node.isRequired,
  autoFullScreen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  actions: PropTypes.node,
}
