'use strict'

import Block from './Block.js'

class DataBlock extends Block {
  constructor (posLeft, posTop, data) {
    super(posLeft, posTop)
    this._type = 'DataBlock'
    this._id = this.makeID()
    this._data = data
  }
  getValue () {
    return this._value
  }
}
export default DataBlock
