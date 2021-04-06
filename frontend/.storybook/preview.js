import React from 'react'
import {ThemeProvider} from '@material-ui/core/styles'
import {Provider} from 'react-redux'

import theme from '../components/themes/defaultTheme'
import store from '../store'

export const decorators = [
  story => (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{story()}</Provider>
    </ThemeProvider>
  ),
]

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  backgrounds: {
    default: 'default',
    values: [
      {name: 'default', value: theme.project.elements.basicDialog.background},
      {name: 'header', value: theme.project.page.header.background},
    ],
  },
  options: {
    storySort: {
      order: [
        'containers',
        'modules',
        'elements'
      ]
    }
  }
}
