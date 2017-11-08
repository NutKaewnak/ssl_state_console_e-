'use strict'

import CommandBlock from './CommandBlock.js'
import Point2d from '../include/model/Point2d.js'
import omniDirectionVelTransform from '../include/omniDirectionVelTransform.js'

class WaitBlock extends CommandBlock {
  /**
   * @param {Number} posLeft
   * @param {Number} posTop
   * @param {Number} time
   */
  constructor (posLeft, posTop, time, id) {
    super(posLeft, posTop, id)
    this._type = 'WaitBlock'
    if (!id) {
      this._id = this.makeID()
    }
    this._point = new Point2d(0, 0, 0)

    this._time = time
    this._startTime = null
  }

  /**
   * @param {Robot} robot
   */
  beforeExecute (robot) {
    this._startTime = new Date().getTime()
    console.log(`Wait for ${JSON.stringify(this._time)}s`)
  }
  /**
   * @param {Robot} robot
   */
  execute (robot) {
    if (new Date().getTime() - this._startTime <= this._time * 1000) {
      robot.sendCommand(JSON.stringify({'id': '00', 'type': 3, 'data': omniDirectionVelTransform(this._point).toString()}))
    } else if (this._nextBlock) {
      console.log(this._nextBlock)
      this.changeStateToNextBlock(robot)
    }
  }
}
export default WaitBlock
