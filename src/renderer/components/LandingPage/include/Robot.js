'use strict'

import blockFactory from '../block/blockFactory.js'
const jsPlumb = require('jsplumb/dist/js/jsplumb.js').jsPlumb
const WebSocket = require('ws')

class Robot {
  /**
   * @param {String} name
   * @param {String} ipAddress
   * @param {String} platform code version for SSL robot. Note: Captain is "SSL v.1" (since he is the first Avenger :P).
   * @param {String} saveFile Path to saved json command block.
   */
  constructor (name, ipAddress, platform, saveFile) {
    this._name = name
    this._ip = ipAddress
    this._platform = platform
    this._saveFile = saveFile
    this._constrain = null
    this._commands = {}
    this.command = null  // fuck
    this._currentBlock = null
    this._ws = null
    this._graph = null
    this.initGraph()
  }
  initWebSocket () {
    this._ws = new WebSocket('ws://' + this._ip + ':8081')
  }
  initGraph () {
    this._graph = jsPlumb.getInstance({
      endpoint: ['Dot', {radius: 1}],
      HoverPaintStyle: {stroke: '#1e8151', strokeWidth: 2},
      ConnectionOverlays: [
        [ 'Arrow', {
          location: 1,
          id: 'arrow',
          length: 14,
          foldback: 0.8
        } ],
        ['Label', { label: 'FOO', id: 'label', cssClass: 'aLabel' }]
      ],
      Container: 'diagramContainer'  // Container: 'canvas'
    })
    this._graph.registerConnectionType('basic', { anchor: 'Continuous', connector: 'StateMachine' })

    this._graph.bind('connection', function (info) {
      info.connection.getOverlay('label').setLabel(info.connection.id)
    })
  }
  loadCommand (arr) {
    for (var cmd in arr) {
      var command = blockFactory(arr[cmd])
      this._commands[command._id] = command
    }
  }
  sendCommand (command) {
    this._ws.send(command)
  }
  // check if necessary
  buildCommand () {
    if (this._commands[0]._type === 'StartBlock') {
      this._currentBlock = this._commands[0]
    }
  }
  execute () {
    this._currentBlock.execute()
  }
}
export default Robot
