import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ListItem,
  Paper,
  Typography
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import {changeRequestText, getFavoriteRequests, removeFavoriteRequest, setAppliedFavoriteRequestID} from '../../slices'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.favoriteRequestsPanel.background,
    borderRadius: theme.spacing(1),
    width: '100%',
    minHeight: '80%',
  },
  title: {
    background: theme.project.page.main.favoriteRequestsPanel.header.background,
    color: theme.project.page.main.favoriteRequestsPanel.header.textColor,
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  closeButton: {
    color: theme.project.page.main.favoriteRequestsPanel.header.closeButton,
  },
  inputPanel: {
    marginTop: theme.spacing(1),
  },
  item: {
    padding: theme.spacing(2),
    width: 400,
    minHeight: 200,
  },
  itemTitle: {
    fontSize: '1.2rem',
  },
  itemContent: {
    marginTop: theme.spacing(2),
  }
}))


function FavoriteRequestItem({favoriteRequest}) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const onAppliedButtonClicked = () => {
    dispatch(setAppliedFavoriteRequestID(favoriteRequest.id))
    dispatch(changeRequestText(favoriteRequest.text))
  }

  const onRemoveButtonClicked = () => {
    dispatch(removeFavoriteRequest(favoriteRequest.id))
  }

  return (
    <Grid className={classes.item} container component={Paper} direction="column" justify="space-between">
      <Grid item>
        <Typography className={classes.itemTitle} variant="h2">{favoriteRequest.name}</Typography>
        <Typography className={classes.itemContent} variant="body2" color="textSecondary"
                    component="p">{favoriteRequest.text}</Typography>
      </Grid>
      <Grid container item>
        <Grid item><Button onClick={onAppliedButtonClicked}>套用</Button></Grid>
        <Grid item><Button onClick={onRemoveButtonClicked}>刪除</Button></Grid>
      </Grid>
    </Grid>
  )
}

export default function FavoriteRequestsPanel({open, onClose}) {
  const classes = useStyles()
  const favoriteRequests = useSelector(getFavoriteRequests)

  return (
    <Dialog classes={{paper: classes.root}} scroll="body" maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle disableTypography className={classes.title}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>常用請求列表</Grid>
          <Grid item><IconButton className={classes.closeButton} aria-label="close"
                                 onClick={onClose}><CloseIcon/></IconButton></Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.inputPanel}>
        <Grid container spacing={2} justify="center">
          {favoriteRequests.map(favoriteRequest => (
            <Grid key={favoriteRequest.id} className={classes.message} item>
              <FavoriteRequestItem favoriteRequest={favoriteRequest}/>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
