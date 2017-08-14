'use strict'

class Point2d {
  constructor (x, y, w) {
    this._x = x
    this._y = y
    this._w = w
  }
  static createPointFromJson (obj) {
    if (obj._x !== null && obj._y !== null && obj._w !== null) {
      return new Point2d(obj._x, obj._y, obj._w)
    } else {
      return null
    }
  }
}
export default Point2d
