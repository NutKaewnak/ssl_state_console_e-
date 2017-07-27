'use strict'
class Robot {
  constructor (name, ipAddress) {
    this._name = name
    this._ip = ipAddress
    this._constrain = null
    this._command = null
  }
}

module.exports = Robot
