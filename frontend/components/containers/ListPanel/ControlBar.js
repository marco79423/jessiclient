import React, {useState} from 'react'
import {useGA4React} from 'ga-4-react'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Chip, Grid, Typography} from '@material-ui/core'

import SearchField from '../../elements/SearchField'
import Button from '../../elements/Button'
import BasicDialog from '../../elements/BasicDialog'
import ClearAllDialog from '../../modules/ListPanel/ClearAllDialog'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.controlBar.background,
    height: 64,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))


export default function ControlBar({searchFilters, setSearchFilters, clearAllMessages}) {
  const classes = useStyles()
   const {t} = useTranslation('common')
  const ga4React = useGA4React()
  const [clearAllDialogOn, setClearAllDialog] = useState(false)

  const onSearchButtonClicked = (value) => {
    setSearchFilters([...searchFilters, value])
    ga4React.gtag('event', 'search', {value})
  }

  const onClearButtonClicked = (targetSearchFilter) => {
    setSearchFilters(searchFilters.filter(searchFilter => searchFilter !== targetSearchFilter))
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
              placeholder={t('搜尋訊息')}
              onSearch={onSearchButtonClicked}
              buttonLabel={t('搜尋')}
            />
          </Grid>
          {searchFilters.map(searchFilter => (
            <Grid key={searchFilter} item>
              <Chip
                label={searchFilter}
                onDelete={() => onClearButtonClicked(searchFilter)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Button onClick={showClearAllDialog}>
          {t('清空訊息')}
        </Button>

        <ClearAllDialog
          open={clearAllDialogOn}
          onClose={hideClearAllDialog}
          confirm={clearAllMessages}
        />
      </Grid>
    </Grid>
  )
}
