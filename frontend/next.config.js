const {i18n} = require('./next-i18next.config')

module.exports = {
  serverRuntimeConfig: {
    backendUrl: 'http://localhost:9001',
  },
  i18n,
}
