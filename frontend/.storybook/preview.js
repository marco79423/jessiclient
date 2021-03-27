import React from 'react'
import {ThemeProvider} from '@material-ui/core/styles'

import theme from '../components/themes/defaultTheme'

export const decorators = [
  story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>,
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
}
