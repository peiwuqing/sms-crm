'use strict'
let params = process.argv[2]
let baseUrl = ''
let messageSocket = '';
let phoneBarConf = {}
switch (params) {
  case '--env=test':
    baseUrl = '"http://39.98.229.167:16005/"';
    messageSocket = '"ws://36.137.200.184:17098"';
    // phoneBarConf = {
    //   socketUrl:'"ws://8.142.69.19:8081/agents"',
    //   domain:'"founder"',
    //   key:'"93ef9a4bc4ed4379f8e7d952899f9c6b"'
    // };
    break
  case '--env=prod':
    baseUrl = '"http://39.98.229.167:16005/"';
    messageSocket = '"ws://36.137.200.184:17098"';
    // phoneBarConf = {
    //   socketUrl:'"ws://8.142.69.19:8081/agents"',
    //   domain:'"founder"',
    //   key:'"93ef9a4bc4ed4379f8e7d952899f9c6b"'
    // };
    break
  default:
    baseUrl = '"http://39.98.229.167:16005/"';
    messageSocket = '"ws://36.137.200.184:17098"';
    // phoneBarConf = {
    //   socketUrl:'"ws://8.142.69.19:8081/agents"',
    //   domain:'"founder"',
    //   key:'"93ef9a4bc4ed4379f8e7d952899f9c6b"'
    // };
}
module.exports = {
  NODE_ENV: '"production"',
  baseUrl: baseUrl,
  messageSocket:messageSocket,
  phoneBarConf:phoneBarConf,
}
