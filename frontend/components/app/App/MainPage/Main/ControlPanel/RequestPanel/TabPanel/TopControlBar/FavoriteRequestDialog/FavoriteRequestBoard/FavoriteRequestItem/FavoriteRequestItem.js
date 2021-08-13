import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper} from '@material-ui/core'

import Header from './Header'
import Content from './Content'
import Control from './Control'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: 350,
    minHeight: 200,
  },
  header: {},
  content: {
    marginTop: theme.spacing(2),
  },
  control: {
    marginTop: theme.spacing(1),
  }
}))


export default function FavoriteRequestItem({id}) {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container component={Paper} direction="column" justifyContent="space-between">
      <Grid item>
        <Header id={id}/>
      </Grid>
      <Grid className={classes.content} item xs>
        <Content id={id}/>
      </Grid>
      <Grid className={classes.control} item>
        <Control id={id}/>
      </Grid>
    </Grid>
  )
}

FavoriteRequestItem.propTypes = {
  id: PropTypes.string.isRequired,
}
