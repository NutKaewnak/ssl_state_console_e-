'use strict'
const WebSocket = require('ws')

class Robot {
  constructor (name, ipAddress, platform) {
    this._name = name
    this._ip = ipAddress
    this._platform = platform
    this._constrain = null
    this._command = null
    this._ws = null
  }
  initWebSocket () {
    this._ws = new WebSocket('ws://' + this._ip + ':8081')
  }
  sendCommand (command) {
    this._ws.send(command)
  }
}
export default Robot
