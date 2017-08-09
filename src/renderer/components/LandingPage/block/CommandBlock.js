'use strict'

import Block from './Block.js'

/**
 * @param {CommandBlock} parentBlock
 */
class CommandBlock extends Block {
  constructor (posLeft, posTop, id) {
    super(posLeft, posTop, id)
    this._type = 'CommandBlock'
    if (!id) {
      this._id = this.makeID()
    }
    this._nextBlock = null

    this._targetOption = {
      dropOptions: { hoverClass: 'dragHover' },
      anchor: 'Left',
      allowLoopback: true
    }
  }
  execute (robot) {
  }
}
export default CommandBlock
