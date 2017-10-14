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
    this._data = this.classifyData(data)
  }
  getData () {
    return this._data
  }
  classifyData (data) {
    if (data === 'true' || data === true) {
      return true
    } else if (data === 'false' || data === false) {
      return false
    } else if (parseFloat(data)) {
      return parseFloat(data)
    }
  }
}
export default DataBlock
