import React from 'react'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'

import theme, {colorTable} from '../theme/default'
import IconButton from './IconButton'
import ArchiveIcon from '@material-ui/icons/Archive'

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
  title: 'elements/IconButton',
  component: IconButton,
  argTypes: {},
  decorators: [
    story => <ThemeProvider theme={muiTheme}>{story()}</ThemeProvider>,
  ],
  parameters: {
    backgrounds: {
      default: 'indigo-800',
      values: [
        {name: 'indigo-800', value: colorTable['indigo-800']},
      ],
    },
  }
}


const Template = (args) => <IconButton {...args} />

export const Default = Template.bind({})
Default.args = {
  description: '匯出專案',
  icon: ArchiveIcon,
}
