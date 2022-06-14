'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
let params = process.argv[4]
let baseUrl = ''
let phoneBarConf = {}
switch (params) {
  case '--env=test':
    // phoneBarConf = {
    //   socketUrl:'"ws://8.142.69.19:8081/agents"',
    //   domain:'"founder"',
    //   key:'"93ef9a4bc4ed4379f8e7d952899f9c6b"'
    // };
    baseUrl = '"http://127.0.0.1:17098/"';
    break
  case '--env=prod':
    // phoneBarConf = {
    //   socketUrl:'"ws://8.142.69.19:8081/agents"',
    //   domain:'"founder"',
    //   key:'"93ef9a4bc4ed4379f8e7d952899f9c6b"'
    // };
    baseUrl = '"http://127.0.0.1:17098/"';
    break
  default:
    // phoneBarConf = {
    //   socketUrl:'"ws://8.142.69.19:8081/agents"',
    //   domain:'"founder"',
    //   key:'"93ef9a4bc4ed4379f8e7d952899f9c6b"'
    // };
    baseUrl = '"http://127.0.0.1:17098/"';
}
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  baseUrl: baseUrl,
  phoneBarConf: phoneBarConf,
})
