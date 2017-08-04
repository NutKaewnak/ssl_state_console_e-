'use strict'

import Point2d from './model/Point2d.js'
import RobotVel from './model/RobotVel.js'

/**
 * @param {Point2d} point2d
 */
function omniDirectionVelTransform (point2d, BIAS) {
  if (!(point2d instanceof Point2d)) {
    return
  }

  if (!BIAS) {
    BIAS = {
      'X1': 0,
      'Y1': 0,
      'X2': 0.1,
      'Y2': 0,
      'X3': 0,
      'Y3': 0,
      'X4': 0.125,
      'Y4': 0,
      'W1': 0,
      'W2': 0.05,
      'W3': 0,
      'W4': 0
    }
  }

  var speedWheel1
  var speedWheel2
  var speedWheel3
  var speedWheel4

  var GAIN_X_WHEEL1 = (0.361454 + BIAS.X1)
  var GAIN_Y_WHEEL1 = (0.272298 + BIAS.Y1)
  var GAIN_W_WHEEL1 = (0.196848 + BIAS.W1)
  // var GAIN_W_WHEEL1  0.196848 * 2

  var GAIN_X_WHEEL2 = (-0.361454 + BIAS.X2)
  var GAIN_Y_WHEEL2 = (0.419347 + BIAS.Y2)
  var GAIN_W_WHEEL2 = (0.303152 + BIAS.W2)
  // var GAIN_W_WHEEL2  0.303152 * 2

  var GAIN_X_WHEEL3 = (-0.361454 + BIAS.X3)
  var GAIN_Y_WHEEL3 = (-0.419347 + BIAS.Y3)
  var GAIN_W_WHEEL3 = (0.303152 + BIAS.W3)
  // var GAIN_W_WHEEL3  0.303152 * 2

  var GAIN_X_WHEEL4 = (0.361454 + BIAS.X4)
  var GAIN_Y_WHEEL4 = (-0.272298 + BIAS.Y4)
  var GAIN_W_WHEEL4 = (0.196848 + BIAS.W4)

  var wheel1 = (GAIN_X_WHEEL1 * point2d._x) + (GAIN_Y_WHEEL1 * point2d._y) + (GAIN_W_WHEEL1 * point2d._w)
  var wheel2 = (GAIN_X_WHEEL2 * point2d._x) + (GAIN_Y_WHEEL2 * point2d._y) + (GAIN_W_WHEEL2 * point2d._w)
  var wheel3 = (GAIN_X_WHEEL3 * point2d._x) + (GAIN_Y_WHEEL3 * point2d._y) + (GAIN_W_WHEEL3 * point2d._w)
  var wheel4 = (GAIN_X_WHEEL4 * point2d._x) + (GAIN_Y_WHEEL4 * point2d._y) + (GAIN_W_WHEEL4 * point2d._w)

  wheel1 = wheel1 / 0.8306  // mapping to max value(1)
  wheel2 = wheel2 / 0.8306
  wheel3 = wheel3 / 0.8306
  wheel4 = wheel4 / 0.8306

  if (wheel1 > 1.0) {
    speedWheel1 = 255
  } else if (wheel1 < -1.0) {
    speedWheel1 = 1
  } else {
    speedWheel1 = wheel1 * 127 + 128
  }

  if (wheel2 > 1.0) {
    speedWheel2 = 255
  } else if (wheel2 < -1.0) {
    speedWheel2 = 1
  } else {
    speedWheel2 = wheel2 * 127 + 128
  }

  if (wheel3 > 1.0) {
    speedWheel3 = 255
  } else if (wheel3 < -1.0) {
    speedWheel3 = 1
  } else {
    speedWheel3 = wheel3 * 127 + 128
  }

  if (wheel4 > 1.0) {
    speedWheel4 = 255
  } else if (wheel4 < -1.0) {
    speedWheel4 = 1
  } else {
    speedWheel4 = wheel4 * 127 + 128
  }

  return new RobotVel(speedWheel1, speedWheel2, speedWheel3, speedWheel4)
}

export default omniDirectionVelTransform
