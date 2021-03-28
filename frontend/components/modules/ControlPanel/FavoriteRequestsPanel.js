import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper, Typography} from '@material-ui/core'

import {
  changeRequestText,
  getFavoriteRequests,
  removeFavoriteRequest,
  sendRequestText,
  setAppliedFavoriteRequestID
} from '../../../slices'
import BasicDialog from '../../elements/BasicDialog'
import Button from '../../elements/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 10000,
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

  const onSendButtonClicked = () => {
    dispatch(sendRequestText(favoriteRequest.text))
  }

  return (
    <Grid className={classes.item} container component={Paper} direction="column" justify="space-between">
      <Grid item>
        <Typography className={classes.itemTitle} variant="h2">{favoriteRequest.name}</Typography>
        <Typography className={classes.itemContent} variant="body2" color="textSecondary"
                    component="p">{favoriteRequest.text}</Typography>
      </Grid>
      <Grid container item>
        <Grid container item xs spacing={1}>
          <Grid item><Button primary onClick={onAppliedButtonClicked}>套用</Button></Grid>
          <Grid item><Button onClick={onRemoveButtonClicked}>刪除</Button></Grid>
        </Grid>
        <Grid item>
          <Grid item><Button primary onClick={onSendButtonClicked}>直接送出</Button></Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default function FavoriteRequestsPanel({open, onClose}) {
  const classes = useStyles()
  const favoriteRequests = useSelector(getFavoriteRequests)

  return (
    <BasicDialog classname={classes.root} size="large" title={'常用請求列表'} open={open} onClose={onClose}>
      <Grid container spacing={2} justify="center">
        {favoriteRequests.map(favoriteRequest => (
          <Grid key={favoriteRequest.id} className={classes.message} item>
            <FavoriteRequestItem favoriteRequest={favoriteRequest}/>
          </Grid>
        ))}
      </Grid>
    </BasicDialog>
  )
}