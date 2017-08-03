'use strict'

class RobotVel {
  constructor (wheel1, wheel2, wheel3, wheel4) {
    this._wheel1 = wheel1
    this._wheel2 = wheel2
    this._wheel3 = wheel3
    this._wheel4 = wheel4
  }

  toString () {
    return this.convert3Digit(Math.floor(this._wheel1)) +
           this.convert3Digit(Math.floor(this._wheel2)) +
           this.convert3Digit(Math.floor(this._wheel3)) +
           this.convert3Digit(Math.floor(this._wheel4))
  }

  convert3Digit (str) {
    return String('000' + str).slice(-3)
  }
}

export default RobotVel
