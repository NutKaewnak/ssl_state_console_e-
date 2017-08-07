'use strict'

import Block from './Block.js'

/**
 * @param {CommandBlock} parentBlock
 */
class CommandBlock extends Block {
  constructor (posLeft, posTop) {
    super(posLeft, posTop)
    this._type = 'CommandBlock'
    this._nextBlock = null
  }
  execute (robot) {

  }
}
export default CommandBlock
