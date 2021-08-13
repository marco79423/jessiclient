import React from 'react'
import {appWithTranslation, useTranslation} from 'next-i18next'
import Head from 'next/head'

import Manifest from '../public/manifest.json'

function App({Component, pageProps}) {
  const {t} = useTranslation()

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{t(Manifest.name)}</title>

        <meta name="application-name" content={t(Manifest.name)}/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
        <meta name="apple-mobile-web-app-title" content={Manifest.short_name}/>
        <meta name="description" content={t(Manifest.description)}/>
        <meta name="keywords" content="jessiclient,websocket,websocket client"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="theme-color" content={Manifest.theme_color}/>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:url" content="https://jessiclient.marco79423.net"/>
        <meta name="twitter:title" content={t(Manifest.name)}/>
        <meta name="twitter:description" content={t(Manifest.description)}/>
        <meta name="twitter:image" content="https://jessiclient.marco79423.net/logo.jpg"/>
        <meta name="twitter:creator" content="@marco79423"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={t(Manifest.name)}/>
        <meta property="og:description" content={t(Manifest.description)}/>
        <meta property="og:site_name" content={Manifest.short_name}/>
        <meta property="og:url" content="https://jessiclient.marco74923.net"/>
        <meta property="og:image" content="https://jessiclient.marco79423.net/logo.jpg"/>

        <link rel="icon" href="/favicon.ico"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192" href="/logo-192x192.png"/>
        <link rel="icon" type="image/png" sizes="512x512" href="/logo-512x512.png"/>

        <link rel="canonical" href="https://jessiclient.marco79423.net/"/>
        <link rel="alternate" hrefLang="x-default" href="https://jessiclient.marco79423.net/en"/>
        <link rel="alternate" hrefLang="zh-TW" href="https://jessiclient.marco79423.net/zh-TW/"/>
        <link rel="alternate" hrefLang="zh-CN" href="https://jessiclient.marco79423.net/zh-CN/"/>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>

        <link rel="manifest" href="/manifest.json"/>
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(App)
