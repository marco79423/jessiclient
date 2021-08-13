import React from 'react'
import PropTypes from 'prop-types'
import lodash from 'lodash'
import {FormControl, InputLabel, OutlinedInput} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'


const hideScrollbar = {
  scrollbarWidth: 'none', // IE and Edge
  msOverflowStyle: 'none', // Firefox
  '&::-webkit-scrollbar': {
    display: 'none' // Chrome, Safari and Opera
  },
}

const useStyles = makeStyles((theme) => ({
  control: {
    height: '100%',
  },

  input: {
    height: '100%',
    alignItems: 'start',  // 將輸入框放至頂部
  },

  internalInput: {
    height: 'calc(100% - 48px)',     // 不要佔滿全部的輸入空間
    overflow: 'auto',  // 自動產生 scrollbar

    resize: 'none',  // 不需要自動調整大小的 grabber

    ...hideScrollbar
  },
}))


function Input(props) {
  // 消除警告，因為 textarea 不支援 inputRef
  props  = lodash.omit(props, ['inputRef'])

  return (
    <textarea {...props} />
  )
}

export default function TextArea({className, label, value, onChange}) {
  const classes = useStyles()

  const onValueChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <FormControl className={`${classes.control} ${className}`} variant="outlined" margin="normal" fullWidth>
      <InputLabel shrink={!!value} htmlFor="component-outlined">{label}</InputLabel>
      <OutlinedInput
        className={classes.input}
        classes={{
          input: classes.internalInput,
        }}
        id="component-outlined"
        value={value}
        onChange={onValueChange}
        label={!!value ? label : undefined}
        inputComponent={Input}
      />
    </FormControl>
  )
}

TextArea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}
