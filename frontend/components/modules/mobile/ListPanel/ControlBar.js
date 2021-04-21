import React, {useState} from 'react'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Chip, Grid} from '@material-ui/core'

import SearchField from '../../../elements/SearchField'
import Button from '../../../elements/Button'
import ClearAllDialog from './ClearAllDialog'
import PropTypes from 'prop-types'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.controlBar.background,
    height: 64,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))


export default function ControlBar({onClearAll}) {
  const classes = useStyles()
  const {t} = useTranslation('ListPanel')
  const [clearAllDialogOn, setClearAllDialog] = useState(false)

  const showClearAllDialog = () => {
    setClearAllDialog(true)
  }

  const hideClearAllDialog = () => {
    setClearAllDialog(false)
  }

  return (
    <Grid className={classes.root} container justify="space-between" alignItems="center">
      <Grid item>
      </Grid>
      <Grid item>
        <Button onClick={showClearAllDialog}>
          {t('清空訊息')}
        </Button>

        <ClearAllDialog
          open={clearAllDialogOn}
          onClose={hideClearAllDialog}
          onClearAll={onClearAll}
        />
      </Grid>
    </Grid>
  )
}

ControlBar.propTypes = {
  onClearAll: PropTypes.func.isRequired,
}
