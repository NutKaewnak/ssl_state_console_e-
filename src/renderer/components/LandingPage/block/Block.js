'use strict'

class Block {
  /**
   * @param {Number} posLeft
   * @param {Number} posTop
   */
  constructor (posLeft, posTop, id) {
    this._type = 'Block'
    this._id = id

    if (posLeft) {
      this._posLeft = posLeft
    } else {
      this._posLeft = 5
    }
    if (posTop) {
      this._posTop = posTop
    } else {
      this._posTop = 5
    }
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
    this._nextBlock = null
  }
  makeID () {
    var now = new Date().getTime()
    return `${this._type}_${now}`
  }
}
export default Block
