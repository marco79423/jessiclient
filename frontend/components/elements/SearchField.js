import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Button as MuiButton, Grid, InputBase, Paper} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    width: 300,
  },
}))

export default function SearchField({placeholder, defaultValue, onSearch}) {
  const classes = useStyles()
  const [value, setValue] = useState('')

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue)
    }
  }, [defaultValue])

  const onValueChange = (e) => {
    setValue(e.target.value)
  }

  const onButtonClicked = () => {
    onSearch(value)
  }

  return (
    <Grid className={classes.root} container alignItems="center" component={Paper}>
      <Grid item xs>
        <InputBase fullWidth placeholder={placeholder} value={value} onChange={onValueChange}/>
      </Grid>
      <Grid item>
        <MuiButton onClick={onButtonClicked}>搜尋</MuiButton>
      </Grid>
    </Grid>
  )
}
