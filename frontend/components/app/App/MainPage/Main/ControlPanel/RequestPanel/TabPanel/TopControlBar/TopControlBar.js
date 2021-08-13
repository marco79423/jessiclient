import React from 'react'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

import useTracker from '../../../../../../../../../features/tracker/useTracker'
import useMobileMode from '../../../../../../../../hooks/useMobileMode'
import {showMessagePanel} from '../../../../../../../../../redux/current'
import Button from '../../../../../../../../elements/Button'
import FavoriteRequestDialog from './FavoriteRequestDialog'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
}))


export default function TopControlBar() {
  const classes = useStyles()
  const tracker = useTracker()
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const mobileMode = useMobileMode()

  const [favoriteRequestDialogOpen, setFavoriteRequestDialogOpen] = React.useState(false)

  const showFavoriteRequestDialog = () => {
    setFavoriteRequestDialogOpen(true)
    tracker.trace('show_favorite_requests_panel')
  }

  const hideFavoriteRequestDialog = () => {
    setFavoriteRequestDialogOpen(false)
  }

  const onShowMessagePanel = () => {
    dispatch(showMessagePanel(true))
  }

  return (
    <>
      <Grid container className={classes.root} justifyContent="space-between">
        <Grid item>
          <Button onClick={showFavoriteRequestDialog}>{t('展開常用列表')}</Button>
        </Grid>
        {mobileMode ? (
          <Grid item>
            <Button onClick={onShowMessagePanel}>{t('展開訊息列表')}</Button>
          </Grid>
        ) : null}
      </Grid>

      <FavoriteRequestDialog
        open={favoriteRequestDialogOpen}
        onClose={hideFavoriteRequestDialog}
      />
    </>
  )
}

TopControlBar.propTypes = {}
