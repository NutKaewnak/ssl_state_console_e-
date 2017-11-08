'use strict'

import CalculationBlock from './CalculationBlock.js'

class PlusBlock extends CalculationBlock {
  constructor (posLeft, posTop, input1, input2, id) {
    super(posLeft, posTop, input1, input2, id)
    this._type = 'PlusBlock'
    if (!id) {
      this._id = this.makeID()
    }
  }
  getData () {
    return this._input1 + this._input2
  }
}
export default PlusBlock
