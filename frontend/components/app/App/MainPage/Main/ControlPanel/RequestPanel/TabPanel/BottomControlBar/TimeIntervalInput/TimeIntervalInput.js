import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

import {selectScheduleTimeInterval} from '../../../../../../../../../../redux/selectors'
import NumberField from '../../../../../../../../../elements/NumberField'
import {changeScheduleTimeInterval} from '../../../../../../../../../../redux/project'
import {useWSClient} from '../../../../../../../../../../features/wsClient'


const useStyles = makeStyles((theme) => ({
  root: {
    width: 130,
  },
}))


export default function TimeIntervalInput() {
  const {t} = useTranslation()
  const classes = useStyles()
  const dispatch = useDispatch()
  const wsClient = useWSClient()

  const timeInterval = useSelector(selectScheduleTimeInterval)
  const validTimeInterval = +timeInterval > 0

  const onChange = (timeInterval) => {
    dispatch(changeScheduleTimeInterval(timeInterval))
  }

  return (
    <Grid className={classes.root} container alignItems="center" spacing={1}>
      <Grid item xs>
        <NumberField
          disabled={wsClient.schedulerEnabled}
          error={!validTimeInterval}
          onChange={onChange}
          value={timeInterval}/>
      </Grid>
      <Grid item>{t('請求 / 秒')}</Grid>
    </Grid>
  )
}

TimeIntervalInput.propTypes = {}
