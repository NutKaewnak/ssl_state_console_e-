'use strict'

import Block from './Block.js'

/**
 * @param {CommandBlock} parentBlock
 */
class CommandBlock extends Block {
  constructor (posLeft, posTop) {
    super(posLeft, posTop)
    this._type = 'CommandBlock'
    this._id = this.makeID()
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
