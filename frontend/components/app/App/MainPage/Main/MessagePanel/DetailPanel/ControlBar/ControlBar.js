import React from 'react'
import {useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

import {selectSelectedMessage} from '../../../../../../../../redux/selectors'
import {DetailMode} from '../../../../../../../../constants'
import Select from '../../../../../../../elements/Select'
import CloseButton from './CloseButton'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.detailPanel.appBar.background,
    height: 64,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))


export default function ControlBar({currentDetailMode, setCurrentDetailMode}) {
  const classes = useStyles()
  const {t} = useTranslation()
  const message = useSelector(selectSelectedMessage)

  const [selections, setSelections] = React.useState([
    {
      key: DetailMode.PlainText,
      label: t('純文字'),
      value: DetailMode.PlainText,
    },
    {
      key: DetailMode.JSON,
      label: t('JSON'),
      value: DetailMode.JSON,
      disabled: false,
    }
  ])

  React.useEffect(() => {
    setSelections([
      {
        key: DetailMode.PlainText,
        label: t('純文字'),
        value: DetailMode.PlainText,
      },
      {
        key: DetailMode.JSON,
        label: t('JSON'),
        value: DetailMode.JSON,
        disabled: !isJSONShowable(message.body),
      }
    ])
  }, [message])

  React.useEffect(() => {
    if (isJSONShowable(message.body)) {
      setCurrentDetailMode(DetailMode.JSON)
    } else {
      setCurrentDetailMode(DetailMode.PlainText)
    }
  }, [message])

  const onSelectionChange = (newValue) => {
    setCurrentDetailMode(newValue)
  }

  return (
    <Grid className={classes.root} container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Select
          currentValue={currentDetailMode}
          selections={selections}
          onSelectionChange={onSelectionChange}
        />
      </Grid>
      <Grid item>
        <CloseButton/>
      </Grid>
    </Grid>
  )
}

const isJSONShowable = (value) => {
  try {
    const jsonData = JSON.parse(value)
    return typeof jsonData === 'object' && jsonData !== null
  } catch {
    return false
  }
}
