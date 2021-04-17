import {useEffect} from 'react'
import {Provider} from 'react-redux'
import Head from 'next/head'
import {CssBaseline} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/core/styles'
import {appWithTranslation} from 'next-i18next'

import store from '../store'
import theme from '../components/themes/defaultTheme'

function App({Component, pageProps}) {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

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
