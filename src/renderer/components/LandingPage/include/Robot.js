'use strict'
const WebSocket = require('ws')

class Robot {
  /**
   * @param {String} name
   * @param {String} ipAddress
   * @param {String} platform code version for SSL robot. Note: Captain is "SSL v.1" (since he is the first Avenger :P).
   * @param {String} saveFile Path to saved json command block.
   */
  constructor (name, ipAddress, platform, saveFile) {
    this._name = name
    this._ip = ipAddress
    this._platform = platform
    this._saveFile = saveFile
    this._constrain = null
    this._command = null
    this._ws = null
  }
  initWebSocket () {
    this._ws = new WebSocket('ws://' + this._ip + ':8081')
  }
  loadCommand (saveFile) {
    var commands = require(saveFile)
    for (var cmd in commands) {
      console.log(cmd)
    }
  }
  sendCommand (command) {
    this._ws.send(command)
  }
}
export default Robot
