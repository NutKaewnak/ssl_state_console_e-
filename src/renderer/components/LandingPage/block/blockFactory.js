'use strict'

import BlockCommand from './BlockCommand.js'

function blockFactory (cmd) {
  switch (cmd._type) {
    case 'BlockCommand':
      return new BlockCommand(cmd._posLeft, cmd._posTop)
  }
}

export default blockFactory
