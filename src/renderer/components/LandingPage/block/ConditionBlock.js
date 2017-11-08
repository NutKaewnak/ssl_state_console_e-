'use strict'

import Block from './Block.js'

/**
 * @param {ConditionBlock} parentBlock
 */
class ConditionBlock extends Block {
  constructor (posLeft, posTop, dataBlock, targetTrue, targetFalse, id) {
    super(posLeft, posTop, id)
    this._type = 'ConditionBlock'
    if (!id) {
      this._id = this.makeID()
    }

    this._dataBlock = dataBlock
    this._targetTrue = targetTrue
    this._targetFalse = targetFalse

    this._targetOption = {
      dropOptions: { hoverClass: 'dragHover' },
      anchor: 'Left',
      allowLoopback: true
    }

    this._nodeOption = {
      filter: '.epTrue',
      anchor: 'Right',
      connectorStyle: { stroke: '#5c96bc', strokeWidth: 2, outlineStroke: 'transparent', outlineWidth: 4 },
      connectionType: 'basic',
      extract: {
        'action': 'the-action'
      },
      maxConnections: 1
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
    this._nextBlock = this._dataBlock.getData() ? this._targetTrue : this._targetFalse
    if (this._nextBlock) {
      console.log(this._nextBlock)
      this.changeStateToNextBlock(robot)
    }
  }
}
export default ConditionBlock
