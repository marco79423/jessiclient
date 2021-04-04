import React, {useEffect, useState} from 'react'
import TextField from './TextField'
import Button from './Button'


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
        <Button link onClick={onButtonClicked}>{buttonLabel}</Button>
      }
    />
  )
}
