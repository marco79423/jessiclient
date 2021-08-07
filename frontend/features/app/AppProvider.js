import React from 'react'
import {Provider} from 'react-redux'
import {ThemeProvider} from '@material-ui/core/styles'

import store from '../../redux/store'
import theme from '../../components/themes/defaultTheme'
import ProviderComposer, {provider} from '../../components/elements/ProviderCompose'
import {WSClientProvider} from '../wsClient'
import {AlerterProvider} from '../alerter'
import {ProjectProvider} from '../project'


/**
 * 所有 App 所需的 Provider
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function AppProvider({children}) {
  return (
    <ProviderComposer providers={[
      // Material-UI 的 Theme Provider
      provider(ThemeProvider, {theme}),
      // Redux 的 Provider
      provider(Provider, {store}),
      // Project 的 Provider (提供處理專案資料相關功能)
      provider(ProjectProvider),
      // Alerter 的 Provider (提供 Popup 訊息的功能)
      provider(AlerterProvider),
      // WSClient 的 Provider (提供 Websocket 相關的功能)
      provider(WSClientProvider),
    ]}>
      {children}
    </ProviderComposer>
  )
}

export default AppProvider
