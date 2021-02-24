import Head from 'next/head'
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import {CssBaseline} from '@material-ui/core'

import currentReducer from '../slices/currentSlice'
import projectReducer from '../slices/projectSlice'
import historyReducer from '../slices/historySlice'
import logReducer from '../slices/logSlice'

const store = configureStore({
  reducer: {
    current: currentReducer,
    project: projectReducer,
    history: historyReducer,
    log: logReducer,
  },
})

function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Jessiclient</title>

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
