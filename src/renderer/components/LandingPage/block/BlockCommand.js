'use strict'

class BlockCommand {
  /**
   * @param {Number} posLeft
   * @param {Number} posTop
   */
  constructor (posLeft, posTop) {
    var now = new Date().getTime()
    this._id = `BlockCommand_${now}`
    this._posLeft = posLeft
    this._posTop = posTop
  }

  execute () {
  }
}
export default BlockCommand
