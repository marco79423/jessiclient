import React from 'react'
import {InputBase} from '@material-ui/core'

export default function PlainView({data}) {
  return (
    <InputBase
      autoFocus
      readOnly
      fullWidth
      multiline
      value={data}
    />
  )
}
