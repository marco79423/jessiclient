import React, {useState} from 'react'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import useTracker from '../../../../../../../../../features/tracker/useTracker'
import Button from '../../../../../../../../elements/Button'
import FavoriteRequestDialog from './FavoriteRequestDialog'
import useWindowSize from '../../../../../../../../hooks/useWindowSize'
import {showMessagePanel} from '../../../../../../../../../redux/current'
import {useDispatch} from 'react-redux'
import {Grid} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'right',
  },
}))


export default function Toolbar() {
  const classes = useStyles()
  const tracker = useTracker()
  const dispatch = useDispatch()
  const [windowWidth, _] = useWindowSize()
  const {t} = useTranslation()

  const [favoriteRequestDialogOpen, setFavoriteRequestDialogOpen] = useState(false)

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
      <Grid container className={classes.root} justify="space-between">
        <Grid item>
        <Button onClick={showFavoriteRequestDialog}>{t('展開常用列表')}</Button>
        </Grid>
        {windowWidth <= 500 ? (
          <Grid item>
        <Button onClick={onShowMessagePanel}>{t('展開訊息列表')}</Button>
        </Grid>
          ): null}
      </Grid>

      <FavoriteRequestDialog
        open={favoriteRequestDialogOpen}
        onClose={hideFavoriteRequestDialog}
      />
    </>
  )
}

Toolbar.propTypes = {}
