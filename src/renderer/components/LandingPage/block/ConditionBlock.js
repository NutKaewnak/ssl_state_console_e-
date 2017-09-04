'use strict'

import Block from './Block.js'

/**
 * @param {ConditionBlock} parentBlock
 */
class ConditionBlock extends Block {
  constructor (posLeft, posTop, condition, id) {
    super(posLeft, posTop, id)
    this._type = 'ConditionBlock'
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
}
export default ConditionBlock
