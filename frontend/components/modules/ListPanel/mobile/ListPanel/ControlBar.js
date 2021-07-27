import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

import Button from '../../../../elements/Button'
import ClearAllMessagesDialog from '../../shared/ClearAllMessagesDialog'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.controlBar.background,
    height: 64,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))


export default function ControlBar({onClearAllMessages}) {
  const classes = useStyles()
  const {t} = useTranslation()
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

        <ClearAllMessagesDialog
          open={clearAllDialogOn}
          onClose={hideClearAllDialog}

          onClearAll={onClearAllMessages}
        />
      </Grid>
    </Grid>
  )
}

ControlBar.propTypes = {
  onClearAllMessages: PropTypes.func.isRequired,
}
