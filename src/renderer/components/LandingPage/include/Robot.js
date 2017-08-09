'use strict'

import blockFactory from '../block/blockFactory.js'
const fs = require('fs')
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
    this._currentBlock = null
    this._ws = null
    this._graph = null
    this.loadCommand()
    this.initGraph()
  }
  initWebSocket () {
    this._ws = new WebSocket('ws://' + this._ip + ':8081')
  }
  initGraph () {
    let robot = this
    robot._graph = jsPlumb.getInstance({
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
    robot._graph.registerConnectionType('basic', { anchor: 'Continuous', connector: 'StateMachine' })

    robot._graph.bind('connection', function (info) {
      robot._commands[info.sourceId]._nextBlock = robot._commands[info.targetId]

      var newConnection = blockFactory({
        _type: 'Connection',
        _sourceNode: info.sourceId,
        _targetNode: info.targetId
      })
      robot._commands[newConnection._id] = newConnection

      // robot.saveCommand()  // autosave

      info.connection.getOverlay('label').setLabel(info.connection.id)
    })
  }
  loadCommand () {
    if (!this._saveFile) {
      return
    }
    var arr = require(`../data/${this._saveFile}`)
    for (var i in arr) {
      var command = blockFactory(arr[i])
      this._commands[command._id] = command
    }
  }
  saveCommand () {
    if (!this._saveFile) {
      return
    }
    fs.writeFileSync(`${__dirname}/../data/${this._saveFile}`, JSON.stringify(this._commands))
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
