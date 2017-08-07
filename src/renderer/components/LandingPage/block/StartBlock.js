'use strict'

import CommandBlock from './CommandBlock.js'

class StartBlock extends CommandBlock {
  constructor (posLeft, posTop) {
    super(posLeft, posTop)
    this._type = 'StartBlock'
  }
  execute () {
    if (this._nextBlock) {
      this._nextBlock.execute()
    }
  }
}
export default StartBlock
