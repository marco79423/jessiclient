import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper} from '@material-ui/core'

import EditableText from './EditableText'


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: 400,
    minHeight: 200,
  },
  title: {
    fontSize: '1.2rem',
  },
  content: {
    marginTop: theme.spacing(2),
  }
}))


export default function EditableCard({title, setTitle, content, setContent, saveButtonLabel, actions}) {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container component={Paper} direction="column" justify="space-between">
      <Grid item>
        <EditableText
          className={classes.title}
          value={title}
          setValue={setTitle}
          buttonLabel={saveButtonLabel}
        />
        <EditableText
          className={classes.content}
          value={content}
          setValue={setContent}
          buttonLabel={saveButtonLabel}
        />
      </Grid>
      <Grid container item>
        {actions}
      </Grid>
    </Grid>
  )
}

EditableCard.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
  saveButtonLabel: PropTypes.string,
  actions: PropTypes.node,
}
