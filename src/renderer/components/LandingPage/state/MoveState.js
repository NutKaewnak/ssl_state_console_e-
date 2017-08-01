'use strict'

import State from './State.js'
import omniDirectionVelTransform from '../include/omniDirectionVelTransform.js'

class MoveState extends State {
  constructor (distance, time) {
    super()
    this._distance = distance
    this._time = time
  }

  execute (robot) {

  }

  toString () {
    return `MoveState: ${this._distance}(cm), ${this._time}(s)`
  }
}
export default MoveState
