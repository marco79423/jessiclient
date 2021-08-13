import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, ListItem as MuiListItem} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.elements.listItem.background,
    height: 80,
    '&:not(:first-child)': {
      marginTop: 1,
    }
  },
}))

export function ListItem({key, selected, onClick, title, children}) {
  const classes = useStyles()

  return (
    <MuiListItem className={classes.root} key={key} selected={selected} onClick={onClick}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          {title}
        </Grid>
        <Grid item>
          {children}
        </Grid>
      </Grid>
    </MuiListItem>
  )
}

ListItem.propTypes = {
  key: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.node,
  children: PropTypes.node,
}

export default React.memo(ListItem)
