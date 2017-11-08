'use strict'

import Connection from './Connection.js'
import StartBlock from './StartBlock.js'
import CommandBlock from './CommandBlock.js'
import DataBlock from './DataBlock.js'
import MoveBlock from './MoveBlock.js'
import WaitBlock from './WaitBlock.js'
import ConditionBlock from './ConditionBlock.js'

/**
 * @param {*} cmd
 * @return {Block} Block
 */
function blockFactory (cmd) {
  if (cmd && cmd._type) {
    switch (cmd._type) {
      case 'Connection':
        return new Connection(cmd._sourceNode, cmd._targetNode, cmd._id)
      case 'StartBlock':
        return new StartBlock(cmd._posLeft, cmd._posTop, cmd._id)
      case 'CommandBlock':
        return new CommandBlock(cmd._posLeft, cmd._posTop, cmd._id)
      case 'DataBlock':
        return new DataBlock(cmd._posLeft, cmd._posTop, cmd._data, cmd._id)
      case 'MoveBlock':
        return new MoveBlock(cmd._posLeft, cmd._posTop, cmd._point, cmd._time, cmd._id)
      case 'WaitBlock':
        return new WaitBlock(cmd._posLeft, cmd._posTop, cmd._time, cmd._id)
      case 'ConditionBlock':
        return new ConditionBlock(cmd._posLeft, cmd._posTop, cmd._dataBlock, cmd._targetTrue, cmd._targetFalse, cmd._id)
    }
  }
}

export default blockFactory
