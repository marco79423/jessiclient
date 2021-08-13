import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {List as MuiList} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    position: 'relative',
    overflow: 'auto',
  },
}))

export function List({height, children}) {
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

export default React.memo(List)
