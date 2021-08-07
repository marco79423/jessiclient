import React from 'react'
import {Grid} from '@material-ui/core'

import CategorySelect from './CategorySelect'
import CategoryControl from './CategoryControl'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
  },
}))


export default function FavoriteRequestCategoryControl() {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container spacing={4} alignItems="center">
      <Grid item>
        <CategorySelect/>
      </Grid>
      <Grid item>
        <CategoryControl/>
      </Grid>
    </Grid>
  )
}

FavoriteRequestCategoryControl.propTypes = {}

