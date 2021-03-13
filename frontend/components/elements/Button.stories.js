import React from 'react'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'

import theme from '../theme/default'
import Button from './Button'

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
  title: 'elements/Button',
  component: Button,
  argTypes: {},
  decorators: [
    story => <ThemeProvider theme={muiTheme}>{story()}</ThemeProvider>,
  ],
}


const Template = (args) => <Button {...args}>按鈕</Button>

export const Default = Template.bind({})
Default.args = {
  primary: false,
  disabled: false,
}
