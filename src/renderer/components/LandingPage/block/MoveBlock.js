'use strict'

import CommandBlock from './CommandBlock.js'
import omniDirectionVelTransform from '../include/omniDirectionVelTransform.js'

class MoveBlock extends CommandBlock {
  /**
   * @param {Number} posLeft
   * @param {Number} posTop
   * @param {Point2d} point2d
   * @param {Number} time
   */
  constructor (posLeft, posTop, point2d, time, id) {
    super(posLeft, posTop, id)
    this._type = 'MoveBlock'
    if (!id) {
      this._id = this.makeID()
    }
    this._point = point2d
    this._time = time
    this._startTime = null
  }

  /**
   * @param {Robot} robot
   */
  beforeExecute (robot) {
    this._startTime = new Date().getTime()
    console.log(`Moving to ${JSON.stringify(this._point)}`)
  }
  /**
   * @param {Robot} robot
   */
  execute (robot) {
    if (new Date().getTime() - this._startTime <= this._time * 1000) {
      console.log('kuy1')
      console.log(omniDirectionVelTransform(this._point))
      robot.sendCommand(JSON.stringify({'id': '00', 'type': 3, 'data': omniDirectionVelTransform(this._point).toString()}))
      console.log('kuy2')
    }
  }
}
export default MoveBlock
