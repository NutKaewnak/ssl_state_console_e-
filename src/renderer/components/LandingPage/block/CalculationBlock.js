'use strict'

import Block from './Block.js'

class CalculationBlock extends Block {
  constructor (posLeft, posTop, input1, input2, id) {
    super(posLeft, posTop, id)
    this._type = 'CalculationBlock'
    if (!id) {
      this._id = this.makeID()
    }

    this._input1 = input1
    this._input2 = input2

    this._targetOption = {
      dropOptions: { hoverClass: 'dragHover' },
      anchor: 'Left',
      allowLoopback: true
    }
    this._nodeOption.maxConnections = -1
  }
  getData () {
    return false
  }
}
export default CalculationBlock
