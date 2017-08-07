'use strict'

class Block {
  /**
   * @param {Number} posLeft
   * @param {Number} posTop
   */
  constructor (posLeft, posTop) {
    var now = new Date().getTime()
    this._type = 'Block'
    this._id = `${this._type}_${now}`
    this._posLeft = posLeft
    this._posTop = posTop
  }
}
export default Block
