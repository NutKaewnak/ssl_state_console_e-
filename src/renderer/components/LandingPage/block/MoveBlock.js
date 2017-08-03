'use strict'

import BlockCommand from './BlockCommand.js'

class MoveBlock extends BlockCommand {
  constructor (posLeft, posTop, point2d, time) {
    super(posLeft, posTop)
    this._id = `MoveBlock_${new Date().getTime()}`
    this._point = point2d
    this._time = time
  }

  execute (robot) {
    robot.sendCommand(this._point)
  }

  toString () {
    return `${super.toString()}, pos: ${this._point}(cm),  time: ${this._time}(s)`
  }
}
export default MoveBlock
