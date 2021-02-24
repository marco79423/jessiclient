import Head from 'next/head'
import {Provider} from 'react-redux'
import {CssBaseline} from '@material-ui/core'
import store from '../store'
import * as constants from './constants'


function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>{constants.SITE_TITLE}</title>

        <link rel="icon" href="/favicon.ico"/>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>

      <CssBaseline/>

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default App
