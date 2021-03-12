import React from 'react'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'

import theme from '../theme/default'
import BasicDialog from './BasicDialog'
import {Button, TextField} from '@material-ui/core'


const muiTheme = createMuiTheme({
  project: theme,
  palette: {
    primary: {
      main: theme.basic.primary,
    },
    secondary: {
      main: theme.basic.secondary,
    },
  },
})

export default {
  title: 'elements/BasicDialog',
  component: BasicDialog,
  argTypes: {},
  decorators: [
    story => <ThemeProvider theme={muiTheme}>{story()}</ThemeProvider>,
  ],
}


const Template = (args) => (
  <BasicDialog {...args}>
    <TextField label="最大訊息數"
               margin="dense"
               value={100}/>
  </BasicDialog>
)

export const Default = Template.bind({})
Default.args = {
  title: '設定',
  open: true,
}

export const WithActions = Template.bind({})
WithActions.args = {
  title: '設定',
  open: true,
  actions: (
    <>
      <Button variant="contained">取消</Button>
      <Button variant="contained" color="primary" onClick={confirm}>修改</Button>
    </>
  )
}
