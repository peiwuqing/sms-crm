'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
let params = process.argv[4]
let baseUrl = ''
let phoneBarConf = {}
switch (params) {
  case '--env=test':
    baseUrl = '"http://127.0.0.1:17098/"';
    break
  case '--env=prod':
    baseUrl = '"http://127.0.0.1:17098/"';
    break
  default:
    baseUrl = '"http://127.0.0.1:17098/"';
}
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  baseUrl: baseUrl,
  phoneBarConf: phoneBarConf,
})
