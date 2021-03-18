import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {ListItem as MuiListItem, ListItemText, Typography} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.elements.listItem.background,
    '&:not(:first-child)': {
      marginTop: 1
    }
  },
  content: {
    marginTop: theme.spacing(1),
    height: 40,

    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

export default function ListItem({key, selected, onClick, title, children}) {
  const classes = useStyles()

  return (
    <MuiListItem className={classes.root} key={key} selected={selected} onClick={onClick}>
      <ListItemText
        primary={title}
        secondary={
          <Typography className={classes.content} variant="body2" color="textPrimary">
            {children}
          </Typography>
        }
      />
    </MuiListItem>
  )
}
