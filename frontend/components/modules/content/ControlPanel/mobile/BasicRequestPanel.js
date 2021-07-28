import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles, Paper} from '@material-ui/core'

import Button from '../../../../elements/Button'
import TextArea from '../../../../elements/TextArea'
import AddFavoriteRequestDialog from '../../../dialogs/AddFavoriteRequestDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    height: '100%',
    maxHeight: 500,
    padding: theme.spacing(2)
  },
  controlBar: {
    textAlign: 'right',
  },
  requestBody: {
    flex: 1,
    marginBottom: theme.spacing(2),
    maxHeight: 400,
  },
  bottomActions: {
    marginTop: theme.spacing(2),
  }
}))

export default function BasicRequestPanel({
                                            isConnected,

                                            requestBody,
                                            onRequestBodyChange,
                                            onSendRequest,

                                            favoriteRequestCategories,
                                            favoriteRequestID,
                                            onShowFavoriteRequestDialog,
                                            onAddFavoriteRequest,
                                            onRemoveFavoriteRequest,
                                          }) {
  const classes = useStyles()
  const {t} = useTranslation()
  const [addFavoriteRequestDialogOpen, setAddFavoriteRequestDialog] = useState(false)

  const onSetFavoriteRequestButtonClick = () => {
    if (favoriteRequestID) {
      onRemoveFavoriteRequest(favoriteRequestID)
    } else {
      setAddFavoriteRequestDialog(true)
    }
  }

  const onAddFavoriteRequestDialogClose = () => {
    setAddFavoriteRequestDialog(false)
  }

  const onAddFavoriteRequestDialogCreate = ({name, categoryID}) => {
    onAddFavoriteRequest({
      name: name,
      body: requestBody,
      categoryID: categoryID,
    })
    onShowFavoriteRequestDialog()
  }

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.controlBar}>
          <Button onClick={onShowFavoriteRequestDialog}>{t('展開常用列表')}</Button>
        </div>
        <div className={classes.requestBody}>
          <TextArea
            label={t('請求內容')}
            value={requestBody}
            onChange={onRequestBodyChange}
          />
        </div>
        <Grid className={classes.bottomActions} container justify="space-between">
          <Grid item>
            <Button disabled={requestBody === ''} onClick={onSetFavoriteRequestButtonClick}>{favoriteRequestID ? t('取消常用') : t('設為常用')}</Button>
          </Grid>
          <Grid item>
            <Button primary disabled={!isConnected} onClick={onSendRequest}>{t('送出')}</Button>
          </Grid>
        </Grid>
      </Paper>

      <AddFavoriteRequestDialog
        open={addFavoriteRequestDialogOpen}
        categories={favoriteRequestCategories}
        onClose={onAddFavoriteRequestDialogClose}
        onCreate={onAddFavoriteRequestDialogCreate}
      />
    </>
  )
}

BasicRequestPanel.propTypes = {
  isConnected: PropTypes.bool.isRequired,

  requestBody: PropTypes.string.isRequired,
  onRequestBodyChange: PropTypes.func.isRequired,
  onSendRequest: PropTypes.func.isRequired,

  favoriteRequestCategories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  favoriteRequestID: PropTypes.string,
  onShowFavoriteRequestDialog: PropTypes.func.isRequired,
  onAddFavoriteRequest: PropTypes.func.isRequired,
  onRemoveFavoriteRequest: PropTypes.func.isRequired,
}
