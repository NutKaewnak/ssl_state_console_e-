'use strict'

import CommandBlock from './CommandBlock.js'
import Point2d from '../include/model/Point2d.js'
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
    if (point2d) {
      if (point2d instanceof Point2d) {
        this._point = point2d
      } else {
        this._point = Point2d.createPointFromJson(point2d)
      }
    }
    this._time = time
    this._startTime = null
  }

  /**
   * @param {Robot} robot
   */
  beforeExecute (robot) {
    this._startTime = new Date().getTime()
    console.log(`Moving to ${JSON.stringify(this._point)}`)
    console.log(this._point instanceof Point2d)
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
export default MoveBlock
