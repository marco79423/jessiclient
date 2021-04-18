const withPWA = require('next-pwa')

const {i18n} = require('./next-i18next.config')

module.exports = withPWA({
  serverRuntimeConfig: {
    backendUrl: 'http://localhost:9001',
  },
  i18n,
  pwa: {
    dest: 'public',
  }
})
