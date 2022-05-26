/** @type {import('next-sitemap').IConfig} */

const {hostUrl} = require('./runtimeConfig')

module.exports = {
  siteUrl: hostUrl,
  generateRobotsTxt: true,
}
