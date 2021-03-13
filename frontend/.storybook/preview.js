import React from 'react'
import {ThemeProvider} from '@material-ui/core/styles'

import theme, {colorTable} from '../components/theme/default'

export const decorators = [
  story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>,
]

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  backgrounds: {
    default: 'default',
    values: [
      {name: 'default', value: theme.project.page.background},
      {name: 'header', value: theme.project.page.header.background},
    ],
  },
}
