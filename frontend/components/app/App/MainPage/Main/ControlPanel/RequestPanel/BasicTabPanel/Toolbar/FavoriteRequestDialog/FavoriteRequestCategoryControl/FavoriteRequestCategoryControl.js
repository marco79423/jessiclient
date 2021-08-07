import React from 'react'
import {Grid} from '@material-ui/core'

import CategorySelect from './CategorySelect'
import CategoryControl from './CategoryControl'


export default function FavoriteRequestCategoryControl() {
  return (
    <Grid container spacing={4} alignItems="center">
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

