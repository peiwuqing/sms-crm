'use strict'
let params = process.argv[2]
let baseUrl = ''
let phoneBarConf = {}
switch (params) {
  case '--env=test':
    baseUrl = '"https://oss-server.xb-sms.com/"';
    break
  case '--env=prod':
    baseUrl = '"https://oss-server.xb-sms.com/"';
    break
  default:
    baseUrl = '"httpsss://oss-server.xb-sms.com/"';
}
module.exports = {
  NODE_ENV: '"production"',
  baseUrl: baseUrl,
  phoneBarConf:phoneBarConf,
}
