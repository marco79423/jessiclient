import React from 'react'
import {useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

import {getFilteredFavoriteRequests} from '../../../../../../../../../../../redux/selectors'
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

  const filteredFavoriteRequests = useSelector(getFilteredFavoriteRequests)

  return (
    <>
      {filteredFavoriteRequests.length > 0 ? (
        <Grid container spacing={2} justify="center">
          {filteredFavoriteRequests.map(favoriteRequest => (
            <FavoriteRequestItem
              key={favoriteRequest.id}
              favoriteRequest={favoriteRequest}
            />
          ))}
        </Grid>
      ) : (
        <div className={classes.emptyMessage}>{t('沒有常用請求')}</div>
      )}
    </>
  )
}

FavoriteRequestBoard.propTypes = {}

