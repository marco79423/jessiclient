import React from 'react'
import {useTranslation} from 'next-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {Grid} from '@material-ui/core'

import {getSchedulerEnabledStatus, getScheduleTimeInterval} from '../../../../../../../../../../redux/selectors'
import NumberField from '../../../../../../../../../elements/NumberField'
import {changeScheduleTimeInterval} from '../../../../../../../../../../redux/project'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 130,
  },
}))


export default function TimeIntervalInput() {
  const {t} = useTranslation()
  const classes = useStyles()
  const dispatch = useDispatch()

  const scheduleEnabled = useSelector(getSchedulerEnabledStatus)
  const timeInterval = useSelector(getScheduleTimeInterval)

  const validTimeInterval = +timeInterval > 0
  const onChange = (timeInterval) => {
    dispatch(changeScheduleTimeInterval(timeInterval))
  }

  return (
    <Grid className={classes.root} container alignItems="center" spacing={1}>
      <Grid item>
        <NumberField
          disabled={scheduleEnabled}
          error={!validTimeInterval}
          onChange={onChange}
          value={timeInterval}/>
      </Grid>
      <Grid item>{t('請求 / 秒')}</Grid>
    </Grid>
  )
}

TimeIntervalInput.propTypes = {}
