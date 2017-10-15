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
   * @param {String} color Default: gray
   */
  constructor (name, ipAddress, platform, saveFile, color) {
    this._name = name
    this._ip = ipAddress
    this._platform = platform
    this._saveFile = saveFile
    this._color = (color != null ? color : ' is-primary ')
    this._constrain = null
    this._commands = {}
    this._startBlock = null
    this._currentBlock = null
    this._ws = null
    this._graph = null
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
        [ 'PlainArrow', {
          location: 0.5,
          id: 'arrow',
          length: 14
        } ]
      ],
      Container: 'diagramContainer'
    })
    robot._graph.registerConnectionType('basic', { anchor: 'Continuous', connector: 'flowchart' })

    robot._graph.bind('connection', function (info) {
      robot._commands[info.sourceId]._nextBlock = robot._commands[info.targetId]
      var newConnection = blockFactory({
        _type: 'Connection',
        _sourceNode: info.sourceId,
        _targetNode: info.targetId
      })
      robot._commands[newConnection._id] = newConnection

      // robot.saveCommand()  // autosave
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
      if (command._type === 'StartBlock') {
        console.log('kuy')
        this._startBlock = this._commands[command._id]
      }
    }
  }
  saveCommand () {
    if (!this._saveFile) {
      return
    }
    console.log(this._commands)
    fs.writeFileSync(`${__dirname}/../data/${this._saveFile}`, JSON.stringify(this._commands, null, '  '))
  }
  sendCommand (command) {
    this._ws.send(command)
  }
  // check if necessary
  buildCommand () {
    this._currentBlock = this._startBlock

    console.log(this._currentBlock)
    if (this._currentBlock._type === 'StartBlock') {
      console.log('Check correct')
    }
  }
  execute () {
    this._currentBlock.execute()
  }
}
export default Robot
