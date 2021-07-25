import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import lodash from 'lodash'
import {Grid} from '@material-ui/core'
import BasicDialog from '../../elements/BasicDialog'
import {makeStyles} from '@material-ui/core/styles'
import Select from '../../elements/Select'
import FavoriteRequestItem from './FavoriteRequestItem'


const useStyles = makeStyles((theme) => ({
  filter: {
    marginBottom: theme.spacing(2)
  }
}))

export default function FavoriteRequestDialog({
                                                isConnected,
                                                open, onClose,
                                                favoriteRequests,
                                                onRemove, onApply, onSend, onUpdate
                                              }) {
  const classes = useStyles()
  const {t} = useTranslation()
  const [currentFilterSelectionValue, setCurrentFilterSelectionValue] = useState()

  const favoriteRequestCategories = React.useMemo(() => lodash(favoriteRequests)
    .map(favoriteRequest => favoriteRequest.category)
    .uniq()
    .value(), [favoriteRequests])

  const filteredSelections = React.useMemo(() => favoriteRequestCategories
    .map(category => ({
      key: category,
      label: category,
      value: category,
    })), [favoriteRequestCategories])

  const filteredFavoriteRequests = React.useMemo(() => favoriteRequests
    .filter(favoriteRequest => favoriteRequest.category === currentFilterSelectionValue), [favoriteRequests, currentFilterSelectionValue])

  useEffect(() => {
    if (favoriteRequestCategories.length > 0 && !favoriteRequestCategories.includes(currentFilterSelectionValue)) {
      setCurrentFilterSelectionValue(favoriteRequestCategories[0])
    }
  }, [favoriteRequestCategories])

  return (
    <BasicDialog title={t('常用請求列表')} autoFullScreen open={open} onClose={onClose}>
      {filteredFavoriteRequests.length > 0 ? (
        <>
          <Select
            className={classes.filter}
            currentValue={currentFilterSelectionValue}
            selections={filteredSelections}
            onSelectionChange={setCurrentFilterSelectionValue}
          />
          <Grid container spacing={2} justify="center">
            {filteredFavoriteRequests.map(favoriteRequest => (
              <FavoriteRequestItem
                key={favoriteRequest.id}
                isConnected={isConnected}
                favoriteRequest={favoriteRequest}
                onRemove={onRemove}
                onApply={onApply}
                onSend={onSend}
                onUpdate={onUpdate}
              />
            ))}
          </Grid>
        </>
      ) : (
        t('目前沒有任何常用的請求')
      )}
    </BasicDialog>
  )
}

FavoriteRequestDialog.propTypes = {
  isConnected: PropTypes.bool.isRequired,

  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  favoriteRequests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,

  onRemove: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

