const withPWA = require('next-pwa')
const withPlugins = require('next-compose-plugins')
const {i18n} = require('./next-i18next.config')

module.exports = withPlugins([
  withPWA,
], {
  future: {
    webpack5: true,
  },

  publicRuntimeConfig: require('./runtimeConfig'),

  i18n,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  }
})
