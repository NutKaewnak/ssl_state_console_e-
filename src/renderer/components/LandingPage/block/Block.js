'use strict'

class Block {
  /**
   * @param {Number} posLeft
   * @param {Number} posTop
   */
  constructor (posLeft, posTop) {
    if (posLeft) {
      posLeft = 5
    }
    if (posTop) {
      posTop = 5
    }
    this._type = 'Block'
    this._id = this.makeID()
    this._posLeft = posLeft
    this._posTop = posTop
    this._nodeOption = {
      filter: '.ep',
      anchor: 'Right',
      connectorStyle: { stroke: '#5c96bc', strokeWidth: 2, outlineStroke: 'transparent', outlineWidth: 4 },
      connectionType: 'basic',
      extract: {
        'action': 'the-action'
      },
      maxConnections: 1
    }
  }
  makeID () {
    var now = new Date().getTime()
    return `${this._type}_${now}`
  }
}
export default Block
