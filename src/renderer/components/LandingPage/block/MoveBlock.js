'use strict'

import BlockCommand from './BlockCommand.js'

class MoveBlock extends BlockCommand {
  /**
   * @param {Number} posLeft
   * @param {Number} posTop
   * @param {Point2d} point2d
   * @param {Number} time
   */
  constructor (posLeft, posTop, point2d, time) {
    super(posLeft, posTop)
    this._id = `MoveBlock_${new Date().getTime()}`
    this._point = point2d
    this._time = time
  }

  execute (robot) {
    robot.sendCommand(this._point)
  }
}
export default MoveBlock
