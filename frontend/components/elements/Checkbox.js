import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Checkbox as MuiCheckbox, Grid, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    color: theme.project.elements.switch.color,
  }
}))


export function Checkbox({checked, setChecked, label}) {
  const classes = useStyles()

  const onChange = (e) => {
    setChecked(e.target.checked)
  }

  return (
    <Grid container alignItems="center">
      <Grid item>
        <MuiCheckbox
          color="primary"
          classes={{colorPrimary: classes.colorPrimary}}
          checked={checked}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <Typography>{label}</Typography>
      </Grid>
    </Grid>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default React.memo(Checkbox)
