import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Chip, Grid} from '@material-ui/core'

import useMobileMode from '../../../hooks/useMobileMode'
import SearchField from '../../../elements/SearchField'
import Button from '../../../elements/Button'
import ClearAllMessagesDialog from '../../dialogs/ClearAllMessagesDialog'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.controlBar.background,
    height: 64,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))


export default function ControlBar({searchFilters, onSearchFilterChange, onClearAllMessages}) {
  const classes = useStyles()
  const {t} = useTranslation()
  const mobileMode = useMobileMode()
  const [clearAllDialogOn, setClearAllDialog] = useState(false)

  const onSearchButtonClick = (searchFilter) => {
    onSearchFilterChange([...searchFilters, searchFilter])
  }

  const onClearButtonClick = (targetSearchFilter) => {
    onSearchFilterChange(searchFilters.filter(searchFilter => searchFilter !== targetSearchFilter))
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
        {!mobileMode ? <Grid container alignItems="baseline" spacing={1}>
          <Grid item>
            <SearchField
              placeholder={t('搜尋訊息')}
              onSearch={onSearchButtonClick}
              buttonLabel={t('搜尋')}
            />
          </Grid>
          {searchFilters.map(searchFilter => (
            <Grid key={searchFilter} item>
              <Chip
                label={searchFilter}
                onDelete={() => onClearButtonClick(searchFilter)}
              />
            </Grid>
          ))}
        </Grid>: null}
      </Grid>
      <Grid item>
        <Button onClick={showClearAllDialog}>
          {t('清空訊息')}
        </Button>

        <ClearAllMessagesDialog
          open={clearAllDialogOn}
          onClose={hideClearAllDialog}

          onClearAll={onClearAllMessages}
        />
      </Grid>
    </Grid>
  )
}

ControlBar.propTypes = {
  searchFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSearchFilterChange: PropTypes.func.isRequired,
  onClearAllMessages: PropTypes.func.isRequired,
}
