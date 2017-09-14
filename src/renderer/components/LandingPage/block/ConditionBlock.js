'use strict'

import Block from './Block.js'

/**
 * @param {ConditionBlock} parentBlock
 */
class ConditionBlock extends Block {
  constructor (posLeft, posTop, conditionBlock, targetTrue, targetFalse, id) {
    super(posLeft, posTop, id)
    this._type = 'ConditionBlock'
    if (!id) {
      this._id = this.makeID()
    }

    this._conditionBlock = conditionBlock
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
    this._nextBlock = this._conditionBlock.getData() ? this._targetTrue : this._targetFalse
    if (this._nextBlock) {
      console.log(this._nextBlock)
      this.changeStateToNextBlock(robot)
    }
  }
}
export default ConditionBlock
