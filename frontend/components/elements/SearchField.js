import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Button as MuiButton, Grid, IconButton, InputBase, Paper} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'


const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    width: 300,
  },
}))

export default function SearchField({placeholder, searchText, onSearch, onClear}) {
  const classes = useStyles()
  const [localSearchText, setLocalSearchText] = useState('')

  useEffect(() => {
    setLocalSearchText(searchText)
  }, [searchText])

  const onLocalSearchTextChange = (e) => {
    setLocalSearchText(e.target.value)
  }

  const onSearchButtonClicked = () => {
    onSearch(localSearchText)
  }

  const onClearButtonClicked = () => {
    onClear()
  }

  return (
    <Grid className={classes.root} container alignItems="center" component={Paper}>
      <Grid item xs>
        <InputBase fullWidth placeholder={placeholder} value={localSearchText} onChange={onLocalSearchTextChange}/>
      </Grid>
      <Grid item>
        {searchText ? (
          <IconButton size="small" onClick={onClearButtonClicked}>
            <ClearIcon/>
          </IconButton>
        ) : null}
      </Grid>
      <Grid item>
        <MuiButton onClick={onSearchButtonClicked}>搜尋</MuiButton>
      </Grid>
    </Grid>
  )
}
