import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid} from '@material-ui/core'
import BasicDialog from '../../../elements/BasicDialog'
import Button from '../../../elements/Button'
import EditableCard from '../../../elements/EditableCard'


export default function FavoriteRequestDialog({
                                                isConnected,
                                                open, onClose,
                                                favoriteRequests,
                                                onRemove, onApply, onSend, onUpdate
                                              }) {

  const {t} = useTranslation('ControlPanel')

  return (
    <BasicDialog fullScreen title={t('常用請求列表')} open={open} onClose={onClose}>
      <Grid container spacing={2} justify="center">
        {favoriteRequests.map(favoriteRequest => (
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

function FavoriteRequestItem({isConnected, favoriteRequest, onRemove, onApply, onSend, onUpdate}) {
  const {t} = useTranslation('ControlPanel')

  const updateName = (name) => {
    onUpdate({id: favoriteRequest.id, changes: {name}})
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
      <EditableCard
        title={favoriteRequest.name}
        setTitle={updateName}
        content={favoriteRequest.body}
        setContent={updateBody}
        saveButtonLabel={t('儲存')}
        actions={(
          <>
            <Grid container item xs spacing={1}>
              <Grid item><Button primary onClick={onApplyButtonClicked}>{t('套用')}</Button></Grid>
              <Grid item><Button onClick={onRemoveButtonClicked}>{t('刪除')}</Button> </Grid>
            </Grid>
            <Grid item>
              <Grid item>
                <Button primary disabled={!isConnected} onClick={onSendButtonClicked}>{t('直接送出')}</Button>
              </Grid>
            </Grid>
          </>
        )}
      />
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
