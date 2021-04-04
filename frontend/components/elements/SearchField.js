import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import TextField from './TextField'
import LinkButton from './LinkButton'


export default function SearchField({placeholder, defaultValue, onSearch, buttonLabel = '搜尋'}) {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue)
    }
  }, [defaultValue])

  const onValueChange = (value) => {
    setValue(value)
  }

  const onButtonClicked = () => {
    onSearch(value)
  }

  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={onValueChange}
      action={
        <LinkButton onClick={onButtonClicked}>{buttonLabel}</LinkButton>
      }
    />
  )
}

SearchField.propTypes = {
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onSearch: PropTypes.func,
  buttonLabel: PropTypes.string,
}
