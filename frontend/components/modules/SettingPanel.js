import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid, TextField} from '@material-ui/core'

import {changeSettingMaxMessageCount, getSettingMaxMessageCount} from '../../slices'
import ModifyDialog from './ModifyDialog'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

export default function SettingPanel({className}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [modifyMaxMessageCountDialogOpen, setModifyMaxMessageCountDialog] = useState(false)

  const maxMessageCount = useSelector(getSettingMaxMessageCount)

  const showModifyMaxMessageCountDialog = () => {
    setModifyMaxMessageCountDialog(true)
  }

  const confirmModifyMaxMessageCountDialog = (maxMessageCount) => {
    dispatch(changeSettingMaxMessageCount(maxMessageCount))
    hideModifyMaxMessageCountDialog()
  }

  const hideModifyMaxMessageCountDialog = () => {
    setModifyMaxMessageCountDialog(false)
  }

  return (
    <Grid className={classNames(classes.root, className)} container direction="column" spacing={3}>
      <Grid container item spacing={2}>
        <Grid item>
          <TextField
            variant="outlined"
            disabled={true}
            value={maxMessageCount}
            label="最大訊息數量"
            size="small"
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={showModifyMaxMessageCountDialog}>
            修改
          </Button>
        </Grid>
        <ModifyDialog
          title="修改最大訊息數"
          defaultValue={maxMessageCount}
          open={modifyMaxMessageCountDialogOpen}
          onConfirm={confirmModifyMaxMessageCountDialog}
          onClose={hideModifyMaxMessageCountDialog}
        />
      </Grid>
    </Grid>
  )
}
