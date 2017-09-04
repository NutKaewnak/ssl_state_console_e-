'use strict'

import Block from './Block.js'

class DataBlock extends Block {
  constructor (posLeft, posTop, data, id) {
    super(posLeft, posTop, id)
    this._type = 'DataBlock'
    if (!id) {
      this._id = this.makeID()
    }
    this._nodeOption.maxConnections = -1
    this._data = data
  }
  getData () {
    return this._data
  }
}
export default DataBlock
