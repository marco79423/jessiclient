import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {List as MuiList} from '@material-ui/core'
import PropTypes from 'prop-types'


const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    position: 'relative',
    overflow: 'auto',
  },
}))

export default function List({height, children}) {
  const classes = useStyles()

  return (
    <MuiList className={classes.root} style={{height: height}}>
      {children}
    </MuiList>
  )
}

List.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number.isRequired,
}
