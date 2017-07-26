'use strict'

var BIAS_X1 = 0
var BIAS_Y1 = 0
var BIAS_X2 = 0.1
var BIAS_Y2 = 0
var BIAS_X3 = 0.125
var BIAS_Y3 = 0
var BIAS_X4 = 0
var BIAS_Y4 = 0

var GAIN_X_WHEEL1 = (0.361454 + BIAS_X1)
var GAIN_Y_WHEEL1 = (0.272298 + BIAS_Y1)
var GAIN_W_WHEEL1 = 0.196848
// var GAIN_W_WHEEL1  0.196848 * 2

var GAIN_X_WHEEL2 = (-0.361454 + BIAS_X2)
var GAIN_Y_WHEEL2 = (0.419347 + BIAS_Y2)
var GAIN_W_WHEEL2 = 0.303152
// var GAIN_W_WHEEL2  0.303152 * 2

var GAIN_X_WHEEL3 = (-0.361454 + BIAS_X3)
var GAIN_Y_WHEEL3 = (-0.419347 + BIAS_Y3)
var GAIN_W_WHEEL3 = 0.303152
// var GAIN_W_WHEEL3  0.303152 * 2

var GAIN_X_WHEEL4 = (0.361454 + BIAS_X4)
var GAIN_Y_WHEEL4 = (-0.272298 + BIAS_Y4)
var GAIN_W_WHEEL4 = 0.196848

function convert3Digit (str) {
  return String('000' + str).slice(-3)
}

const omniDirectionVelTransform = function (x, y, w) {
  var speedWheel1
  var speedWheel2
  var speedWheel3
  var speedWheel4

  var wheel1 = (GAIN_X_WHEEL1 * x) + (GAIN_Y_WHEEL1 * y) + (GAIN_W_WHEEL1 * w)
  var wheel2 = (GAIN_X_WHEEL2 * x) + (GAIN_Y_WHEEL2 * y) + (GAIN_W_WHEEL2 * w)
  var wheel3 = (GAIN_X_WHEEL3 * x) + (GAIN_Y_WHEEL3 * y) + (GAIN_W_WHEEL3 * w)
  var wheel4 = (GAIN_X_WHEEL4 * x) + (GAIN_Y_WHEEL4 * y) + (GAIN_W_WHEEL4 * w)

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

  return convert3Digit(Math.floor(speedWheel1)) + convert3Digit(Math.floor(speedWheel2)) + convert3Digit(Math.floor(speedWheel3)) + convert3Digit(Math.floor(speedWheel4))
}

module.exports = omniDirectionVelTransform
