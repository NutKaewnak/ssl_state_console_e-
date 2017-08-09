'use strict'

import Block from './Block.js'

class DataBlock extends Block {
  constructor (posLeft, posTop, data, id) {
    super(posLeft, posTop, id)
    this._type = 'DataBlock'
    if (!id) {
      this._id = this.makeID()
    }
    this._data = data
  }
  getValue () {
    return this._value
  }
}
export default DataBlock
