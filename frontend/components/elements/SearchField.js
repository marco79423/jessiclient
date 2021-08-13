import React from 'react'
import PropTypes from 'prop-types'

import TextField from './TextField'
import LinkButton from './LinkButton'


export default function SearchField({className, placeholder, defaultValue, onSearch, buttonLabel = '搜尋'}) {
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue)
    }
  }, [defaultValue])

  const onValueChange = (value) => {
    setValue(value)
  }

  const onButtonClicked = () => {
    onSearch(value)
    setValue('')
  }

  return (
    <TextField
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onValueChange}
      action={
        <LinkButton disabled={!value} onClick={onButtonClicked}>{buttonLabel}</LinkButton>
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
