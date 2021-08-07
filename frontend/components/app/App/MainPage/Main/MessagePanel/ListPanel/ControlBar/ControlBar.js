import React, {useState} from 'react'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Chip, Grid} from '@material-ui/core'
import SearchField from '../../../../../../../elements/SearchField'
import Button from '../../../../../../../elements/Button'
import ClearAllMessagesDialog from './ClearAllMessagesDialog'
import {useDispatch, useSelector} from 'react-redux'
import * as currentActions from '../../../../../../../../redux/current'
import {showMessagePanel} from '../../../../../../../../redux/current'
import {getMessage, getSearchFilters} from '../../../../../../../../redux/selectors'
import useWindowSize from '../../../../../../../hooks/useWindowSize'


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
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [windowWidth] = useWindowSize()

  const searchFilters = useSelector(getSearchFilters)
  const message = useSelector(getMessage)

  const [clearAllDialogOn, setClearAllDialog] = useState(false)

  const onCloseButtonClick = () => {
    dispatch(showMessagePanel(false))
  }

  const onSearchButtonClick = (searchFilter) => {
    dispatch(currentActions.setSearchFilters([...searchFilters, searchFilter]))
  }

  const onClearButtonClick = (targetSearchFilter) => {
    dispatch(currentActions.setSearchFilters(searchFilters.filter(searchFilter => searchFilter !== targetSearchFilter)))
  }

  const showClearAllDialog = () => {
    setClearAllDialog(true)
  }

  const hideClearAllDialog = () => {
    setClearAllDialog(false)
  }

  return (
    <Grid className={classes.root} container justify="space-between" alignItems="center">
      {windowWidth <= 500 ? (
        <Grid item>
          <Button onClick={onCloseButtonClick}>{t('關閉訊息列表')}</Button>
        </Grid>
      ) : null}
      <Grid item>
        {windowWidth >= (message ? 1500 : 1000)? (
          <Grid container alignItems="baseline" spacing={1}>
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
          </Grid>
        ) : null}
      </Grid>
      <Grid item>
        <Button onClick={showClearAllDialog}>
          {t('清空訊息')}
        </Button>

        <ClearAllMessagesDialog
          open={clearAllDialogOn}
          onClose={hideClearAllDialog}
        />
      </Grid>
    </Grid>
  )
}

ControlBar.propTypes = {}
