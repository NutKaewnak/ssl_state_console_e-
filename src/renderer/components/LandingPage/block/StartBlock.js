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
    console.log(`${robot._name} started!`)
    if (this._nextBlock) {
      this.changeStateToNextBlock(robot)
    }
  }
}
export default StartBlock
