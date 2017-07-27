'use strict'
class Robot {
  constructor (name, ipAddress) {
    this._name = name
    this._ip = ipAddress
    this.command = null
  }
}

module.exports = Robot
