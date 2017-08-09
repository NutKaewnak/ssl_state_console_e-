'use strict'

import CommandBlock from './CommandBlock.js'

class StartBlock extends CommandBlock {
  constructor (posLeft, posTop) {
    super(posLeft, posTop)
    this._type = 'StartBlock'
    this._id = this.makeID()
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
