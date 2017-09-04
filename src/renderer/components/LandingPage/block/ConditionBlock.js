'use strict'

import Block from './Block.js'

/**
 * @param {ConditionBlock} parentBlock
 */
class ConditionBlock extends Block {
  constructor (posLeft, posTop, condition, targetTrue, targetFalse, id) {
    super(posLeft, posTop, id)
    this._type = 'ConditionBlock'
    if (!id) {
      this._id = this.makeID()
    }

    this._condition = condition
    this._targetTrue = targetTrue
    this._targetFalse = targetFalse

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
    if (this._condition) {
      this._nextBlock = 
    }
    if (this._nextBlock) {
      console.log(this._nextBlock)
      this.changeStateToNextBlock(robot)
    }
  }
}
export default ConditionBlock
