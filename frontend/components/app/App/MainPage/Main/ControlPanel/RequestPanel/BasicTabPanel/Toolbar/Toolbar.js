import React, {useState} from 'react'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import useTracker from '../../../../../../../../../features/tracker/useTracker'
import Button from '../../../../../../../../elements/Button'
import FavoriteRequestDialog from './FavoriteRequestDialog'


const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'right',
  },
}))


export default function Toolbar() {
  const classes = useStyles()
  const tracker = useTracker()
  const {t} = useTranslation()

  const [favoriteRequestDialogOpen, setFavoriteRequestDialogOpen] = useState(false)

  const showFavoriteRequestDialog = () => {
    setFavoriteRequestDialogOpen(true)
    tracker.trace('show_favorite_requests_panel')
  }

  const hideFavoriteRequestDialog = () => {
    setFavoriteRequestDialogOpen(false)
  }

  return (
    <>
      <div className={classes.root}>
        <Button onClick={showFavoriteRequestDialog}>{t('展開常用列表')}</Button>
      </div>

      <FavoriteRequestDialog
        open={favoriteRequestDialogOpen}
        onClose={hideFavoriteRequestDialog}
      />
    </>
  )
}

Toolbar.propTypes = {}
