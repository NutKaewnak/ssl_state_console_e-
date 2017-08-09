'use strict'

class Connection {
  constructor (sourceNode, targetNode, id) {
    this._type = 'Connection'

    if (id) {
      this._id = id
    } else {
      this._id = `${this._type}_${new Date().getTime()}`
    }
    this._sourceNode = sourceNode
    this._targetNode = targetNode
  }
}

export default Connection
