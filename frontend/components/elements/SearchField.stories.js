import React from 'react'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'

import theme from '../theme/default'
import SearchField from './SearchField'

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
  title: 'elements/SearchField',
  component: SearchField,
  argTypes: {},
  decorators: [
    story => <ThemeProvider theme={muiTheme}>{story()}</ThemeProvider>,
  ],
}


const Template = (args) => <SearchField {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: '搜尋訊息',
  searchText: '',
}
