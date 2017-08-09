'use strict'

import CommandBlock from './CommandBlock.js'

class StartBlock extends CommandBlock {
  constructor (posLeft, posTop, id) {
    super(posLeft, posTop, id)
    this._type = 'StartBlock'
    if (!id) {
      this._id = this.makeID()
    }
    this._targetOption = null
  }

  /**
   * @param {Robot} robot
   */
  execute (robot) {
    if (this._nextBlock) {
      robot.currentBlock = this._nextBlock
      this._nextBlock.execute()
    }
  }
}
export default StartBlock
