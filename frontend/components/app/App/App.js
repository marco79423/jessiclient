import React from 'react'

import {AppProvider} from '../../../features/app'
import MainPage from './MainPage'


/**
 * 主應用的進入點
 * @returns {JSX.Element}
 */
export default function App() {
  return (
    <AppProvider>
      <MainPage/>
    </AppProvider>
  )
}

