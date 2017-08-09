'use strict'

class Block {
  /**
   * @param {Number} posLeft
   * @param {Number} posTop
   */
  constructor (posLeft, posTop) {
    this._type = 'Block'
    this._id = this.makeID()
    this._posLeft = posLeft
    this._posTop = posTop
  }
  makeID () {
    var now = new Date().getTime()
    return `${this._type}_${now}`
  }
}
export default Block
