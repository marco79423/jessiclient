import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid, TextField} from '@material-ui/core'

import {changeSettingMaxHistoryCount, getSettingMaxHistoryCount} from '../../slices'
import ModifyDialog from './ModifyDialog'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

export default function SettingPanel({className}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [modifyMaxHistoryCountDialogOpen, setModifyMaxHistoryCountDialog] = useState(false)

  const maxHistoryCount = useSelector(getSettingMaxHistoryCount)

  const showModifyMaxHistoryCountDialog = () => {
    setModifyMaxHistoryCountDialog(true)
  }

  const confirmModifyMaxHistoryCountDialog = (maxHistoryCount) => {
    dispatch(changeSettingMaxHistoryCount(maxHistoryCount))
    hideModifyMaxHistoryCountDialog()
  }

  const hideModifyMaxHistoryCountDialog = () => {
    setModifyMaxHistoryCountDialog(false)
  }

  return (
    <Grid className={classNames(classes.root, className)} container direction="column" spacing={3}>
      <Grid container item spacing={2}>
        <Grid item>
          <TextField
            variant="outlined"
            disabled={true}
            value={maxHistoryCount}
            label="最大訊息數量"
            size="small"
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={showModifyMaxHistoryCountDialog}>
            修改
          </Button>
        </Grid>
        <ModifyDialog
          title="修改最大訊息數"
          defaultValue={maxHistoryCount}
          open={modifyMaxHistoryCountDialogOpen}
          onConfirm={confirmModifyMaxHistoryCountDialog}
          onClose={hideModifyMaxHistoryCountDialog}
        />
      </Grid>
    </Grid>
  )
}
