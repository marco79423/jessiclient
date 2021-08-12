import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Chip} from '@material-ui/core'

import {removeSearchQuery} from '../../../../../../../../../../redux/current'
import {selectSearchQuery} from '../../../../../../../../../../redux/selectors'


const useStyles = makeStyles((theme) => ({
  root: {},
}))


export default function MessageFilter({id}) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const searchQuery = useSelector(selectSearchQuery(id))

  const onDelete = () => {
    dispatch(removeSearchQuery(searchQuery.id))
  }

  return (
    <Chip
      className={classes.root}
      label={searchQuery.value}
      onDelete={onDelete}
    />
  )
}

MessageFilter.propTypes = {}
