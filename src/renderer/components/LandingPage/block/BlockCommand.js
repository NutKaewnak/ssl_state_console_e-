'use strict'

class BlockCommand {
  constructor (posLeft, posTop) {
    var now = new Date().getTime()
    this._id = `BlockCommand_${now}`
    this._posLeft = posLeft
    this._posTop = posTop
  }

  execute () {
  }

  toString () {
    return `${this._id}: ${this._posX}, ${this._posY}`
  }
}
export default BlockCommand
