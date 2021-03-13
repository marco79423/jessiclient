import Head from 'next/head'
import {Provider} from 'react-redux'
import {CssBaseline} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/core/styles'

import store from '../store'
import {appWithTranslation} from 'next-i18next'
import theme from '../components/theme/default'


function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Jessiclient</title>

        <link rel="icon" href="/favicon.ico"/>
        <link rel="shortcut icon" href="/favicon.ico"/>

        <link rel="canonical" hrefLang="en" href="https://jessiclient.marco79423.net/"/>
        <link rel="alternate" hrefLang="zh-TW" href="https://jessiclient.marco79423.net/zh-TW/"/>
        <link rel="alternate" hrefLang="zh-CN" href="https://jessiclient.marco79423.net/zh-CN/"/>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>

      <CssBaseline/>

      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default appWithTranslation(App)
