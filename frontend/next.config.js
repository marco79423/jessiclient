const withPWA = require('next-pwa')
const withPlugins = require('next-compose-plugins')
const {i18n} = require('./next-i18next.config')

module.exports = withPlugins([
  withPWA,
], {
  future: {
    webpack5: true,
  },
  serverRuntimeConfig: {
    backendUrl: 'http://localhost:9001',
  },

  publicRuntimeConfig: {
    gaTrackingCode: '',

    locales: [
      {
        label: 'English',
        langCode: 'en',
      },
      {
        label: '繁體中文',
        langCode: 'zh-TW',
      },
      {
        label: '简体中文',
        langCode: 'zh-CN',
      },
    ],
  },

  i18n,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  }
})
