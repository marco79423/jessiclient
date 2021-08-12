import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'

import BasicDialog from '../../../../../../../../../elements/BasicDialog'
import ControlBar from './ControlBar'
import FavoriteRequestBoard from './FavoriteRequestBoard/FavoriteRequestBoard'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {},
  board: {
    marginTop: theme.spacing(1),
  }
}))

export default function FavoriteRequestDialog({open, onClose}) {
  const classes = useStyles()
  const {t} = useTranslation()

  return (
    <BasicDialog title={t('常用請求列表')} autoFullScreen open={open} onClose={onClose}>
      <div>
        <ControlBar/>
      </div>
      <div className={classes.board}>
        <FavoriteRequestBoard/>
      </div>
    </BasicDialog>
  )
}

FavoriteRequestDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

