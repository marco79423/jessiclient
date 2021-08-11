import React from 'react'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

import {selectSearchQueryIDs} from '../../../../../../../../../redux/selectors'
import MessageFilter from './MessageFilter'


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    zIndex: 1,

    top: theme.spacing(1),
    left: theme.spacing(1),
    width: 'calc(100% - 32px)',
  },
}))


export default function MessageFilters() {
  const classes = useStyles()

  const searchQueryIDs = useSelector(selectSearchQueryIDs)

  return (
    <Grid className={classes.root} container spacing={1}>
      {searchQueryIDs.map(searchQueryID => (
        <Grid key={searchQueryID} item>
          <MessageFilter id={searchQueryID}/>
        </Grid>
      ))}
    </Grid>
  )
}

MessageFilters.propTypes = {}
