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

    this._targetOption = {
      dropOptions: { hoverClass: 'dragHover' },
      anchor: 'Left',
      allowLoopback: true
    }
  }
  /**
   * @param {Robot} robot
   */
  beforeExecute (robot) {
  }
  /**
   * @param {Robot} robot
   */
  execute (robot) {
  }
  changeStateToNextBlock (robot) {
    this._nextBlock.beforeExecute()
    robot._currentBlock = this._nextBlock
  }
}
export default CommandBlock
