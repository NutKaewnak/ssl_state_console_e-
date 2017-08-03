'use strict'

class BlockCommand {
  constructor (posX, posY) {
    var now = new Date().getTime()
    this._id = `BlockCommand_${now}`
    this._posX = posX
    this._posY = posY
  }
  execute () {
  }
  toString () {
    return `${this._id}: ${this._posX}, ${this._posY}`
  }
}
export default BlockCommand
