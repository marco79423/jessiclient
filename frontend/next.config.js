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
  i18n,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  }
})
