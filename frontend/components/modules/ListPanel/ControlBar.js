import {useGA4React} from 'ga-4-react'
import {useDispatch, useSelector} from 'react-redux'
import {addSearchFilter, getSearchFilters, removeSearchFilter} from '../../../slices'
import React, {useState} from 'react'
import {Chip, Grid} from '@material-ui/core'
import SearchField from '../../elements/SearchField'
import Button from '../../elements/Button'
import ClearAllDialog from './ClearAllDialog'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.controlBar.background,
    height: 64,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))


export default function ControlBar() {
  const classes = useStyles()
  const ga4React = useGA4React()
  const dispatch = useDispatch()
  const searchFilters = useSelector(getSearchFilters)
  const [clearAllDialogOn, setClearAllDialog] = useState(false)

  const onSearchButtonClicked = (value) => {
    dispatch(addSearchFilter(value))
    ga4React.gtag('event', 'search', {value})
  }

  const onClearButtonClicked = (id) => {
    dispatch(removeSearchFilter(id))
  }

  const showClearAllDialog = () => {
    setClearAllDialog(true)
  }

  const hideClearAllDialog = () => {
    setClearAllDialog(false)
  }

  return (
    <Grid className={classes.root} container justify="space-between" alignItems="center">
      <Grid item>
        <Grid container alignItems="baseline" spacing={1}>
          <Grid item>
            <SearchField
              placeholder='搜尋訊息'
              onSearch={onSearchButtonClicked}
            />
          </Grid>
          {searchFilters.map(searchFilter => (
            <Grid key={searchFilter.id} item>
              <Chip
                label={searchFilter.text}
                onDelete={() => onClearButtonClicked(searchFilter.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Button onClick={showClearAllDialog}>
          清空訊息
        </Button>
        <ClearAllDialog open={clearAllDialogOn} onClose={hideClearAllDialog}/>
      </Grid>
    </Grid>
  )
}
