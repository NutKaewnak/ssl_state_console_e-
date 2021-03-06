'use strict'

import Point2d from './model/Point2d.js'

function robotVelConvertion (point, step) {
  var maxVel = Math.PI * 51.20 / (360 / step)
  return new Point2d(point._x / maxVel, point._y / maxVel, point._w / maxVel)
}

export default robotVelConvertion
