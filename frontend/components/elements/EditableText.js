import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from '@material-ui/core'

import TextField from './TextField'
import LinkButton from './LinkButton'


export default function EditableText({className, value, setValue, allowEmpty, buttonLabel = '儲存'}) {
  const [editMode, setEditMode] = React.useState(false)
  const [localValue, setLocalValue] = React.useState(value)

  React.useEffect(() => {
    setLocalValue(value)
  }, [value])

  const enableEditMode = () => {
    setEditMode(true)
  }

  const disableEditMode = () => {
    setEditMode(false)
  }

  const onSaveButtonClick = () => {
    setValue(localValue)
    disableEditMode()
  }

  const onChange = (v) => {
    setLocalValue(v)
  }

  if (editMode) {
    return (
      <TextField
        className={className}
        multiline
        value={localValue}
        onChange={onChange}
        action={<LinkButton disabled={!allowEmpty && localValue === ''} onClick={onSaveButtonClick}>{buttonLabel}</LinkButton>}
      />
    )
  }

  return (
    <Typography className={className} onClick={enableEditMode}>{value}</Typography>
  )
}

EditableText.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  allowEmpty: PropTypes.bool,
  buttonLabel: PropTypes.string,
}
