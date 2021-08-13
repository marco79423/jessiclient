import React from 'react'
import {useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

import {selectFilteredFavoriteRequestIDs} from '../../../../../../../../../../../redux/selectors'
import FavoriteRequestItem from './FavoriteRequestItem'


const useStyles = makeStyles((theme) => ({
  emptyMessage: {
    fontSize: '1.1rem',
    marginTop: theme.spacing(2)
  }
}))

export default function FavoriteRequestBoard() {
  const classes = useStyles()
  const {t} = useTranslation()

  const favoriteRequestIDs = useSelector(selectFilteredFavoriteRequestIDs)

  return (
    <>
      {favoriteRequestIDs.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {favoriteRequestIDs.map(favoriteRequestID => (
            <Grid key={favoriteRequestID} item>
              <FavoriteRequestItem
                id={favoriteRequestID}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className={classes.emptyMessage}>{t('沒有常用請求')}</div>
      )}
    </>
  )
}

FavoriteRequestBoard.propTypes = {}

