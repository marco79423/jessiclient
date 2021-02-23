import Head from 'next/head'
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import {CssBaseline} from '@material-ui/core'

import currentReducer from '../slices/currentSlice'
import projectsReducer from '../slices/projectsSlice'
import settingsReducer from '../slices/settingsSlice'
import connectionsReducer from '../slices/connectionsSlice'
import requestsReducer from '../slices/requestsSlice'
import historiesReducer from '../slices/historiesSlice'
import logsReducer from '../slices/logsSlice'

const store = configureStore({
  reducer: {
    current: currentReducer,
    projects: projectsReducer,
    settings: settingsReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
    histories: historiesReducer,
    logs: logsReducer,
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
