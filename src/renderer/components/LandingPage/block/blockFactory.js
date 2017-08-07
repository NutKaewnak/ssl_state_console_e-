'use strict'

import StartBlock from './StartBlock.js'
import CommandBlock from './CommandBlock.js'
import DataBlock from './DataBlock.js'
import MoveBlock from './MoveBlock.js'

function blockFactory (cmd) {
  switch (cmd._type) {
    case 'Start':
      return new StartBlock(cmd._posLeft, cmd._posTop)
    case 'CommandBlock':
      return new CommandBlock(cmd._posLeft, cmd._posTop)
    case 'DataBlock':
      return new DataBlock(cmd._posLeft, cmd._posTop, cmd._data)
    case 'MoveBlock':
      return new MoveBlock(cmd._posLeft, cmd._posTop, cmd._point, cmd._time)
  }
}

export default blockFactory
