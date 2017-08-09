'use strict'

import CommandBlock from './CommandBlock.js'

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
  }

  execute (robot) {
    robot.sendCommand(this._point)
  }
}
export default MoveBlock
