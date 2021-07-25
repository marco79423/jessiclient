import {makeStyles} from '@material-ui/core/styles'
import {useTranslation} from 'next-i18next'
import {Grid, Paper} from '@material-ui/core'
import EditableText from '../../elements/EditableText'
import Button from '../../elements/Button'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: 350,
    minHeight: 200,
  },
  title: {
    fontSize: '1.2rem',
  },
  category: {
    fontSize: '1.1rem',
  },
  content: {
    marginTop: theme.spacing(2),
  }
}))


export default function FavoriteRequestItem({isConnected, favoriteRequest, onRemove, onApply, onSend, onUpdate}) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')

  const updateName = (name) => {
    onUpdate({id: favoriteRequest.id, changes: {name}})
  }

  const updateCategory = (category) => {
    onUpdate({id: favoriteRequest.id, changes: {category}})
  }

  const updateBody = (body) => {
    onUpdate({id: favoriteRequest.id, changes: {body}})
  }

  const onApplyButtonClicked = () => {
    onApply(favoriteRequest)
  }

  const onRemoveButtonClicked = () => {
    onRemove(favoriteRequest.id)
  }

  const onSendButtonClicked = () => {
    onSend(favoriteRequest)
  }

  return (
    <Grid key={favoriteRequest.id} item>
      <Grid className={classes.root} container component={Paper} direction="column" justify="space-between">
        <Grid item>
          <Grid container justify="space-between">
            <EditableText
              className={classes.title}
              value={favoriteRequest.name}
              setValue={updateName}
              buttonLabel={t('儲存')}
            />
            <EditableText
              className={classes.category}
              placeholder={'分類'}
              value={favoriteRequest.category}
              setValue={updateCategory}
              buttonLabel={t('儲存')}
            />
          </Grid>
          <EditableText
            className={classes.content}
            value={favoriteRequest.body}
            setValue={updateBody}
            buttonLabel={t('儲存')}
          />
        </Grid>
        <Grid container item>
          <Grid container item xs spacing={1}>
            <Grid item><Button primary onClick={onApplyButtonClicked}>{t('套用')}</Button></Grid>
            <Grid item><Button onClick={onRemoveButtonClicked}>{t('刪除')}</Button> </Grid>
          </Grid>
          <Grid item>
            <Grid item>
              <Button primary disabled={!isConnected} onClick={onSendButtonClicked}>{t('直接送出')}</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

FavoriteRequestItem.propTypes = {
  isConnected: PropTypes.bool.isRequired,

  favoriteRequest: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,

  onRemove: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}
