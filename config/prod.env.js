'use strict'
let params = process.argv[2]
let baseUrl = ''
let phoneBarConf = {}
switch (params) {
  case '--env=test':
    baseUrl = '"http://127.0.0.1:17098/"';
    // phoneBarConf = {
    //   socketUrl:'"ws://8.142.69.19:8081/agents"',
    //   domain:'"founder"',
    //   key:'"93ef9a4bc4ed4379f8e7d952899f9c6b"'
    // };
    break
  case '--env=prod':
    baseUrl = '"http://127.0.0.1:17098/"';
    // phoneBarConf = {
    //   socketUrl:'"ws://8.142.69.19:8081/agents"',
    //   domain:'"founder"',
    //   key:'"93ef9a4bc4ed4379f8e7d952899f9c6b"'
    // };
    break
  default:
    baseUrl = '"http://127.0.0.1:17098/"';
    // phoneBarConf = {
    //   socketUrl:'"ws://8.142.69.19:8081/agents"',
    //   domain:'"founder"',
    //   key:'"93ef9a4bc4ed4379f8e7d952899f9c6b"'
    // };
}
module.exports = {
  NODE_ENV: '"production"',
  baseUrl: baseUrl,
  phoneBarConf:phoneBarConf,
}
