<template>
  <div class="columns">
    <div
    @mouseup="getMousePos"
    @touchend="getMousePos"
    id="diagramContainer" 
    class="jtk-demo-canvas canvas-wide statemachine-demo jtk-surface jtk-surface-nopan column is-6">

      <div v-if="ready">
        <div v-for="cmd in currentRobot._commands">
          <div v-if="cmd && cmd._type !== 'Connection'"
          v-on:dblclick="deleteNode(cmd)"
          :class="cmd._type" :id="cmd._id"
          :style="`left: ${cmd._posLeft}; top: ${cmd._posTop}`">
          {{cmd._type}}
            <div v-if="cmd._targetOption" class="target"></div>
            <div class="ep" :action="cmd._type"></div>
            </br>
            <div v-if="cmd._type === 'MoveBlock'" v-on:click="" class="input is-small" style="width:90px">{{cmd._point}}</div>
            <div v-if="cmd._type === 'DataBlock'" v-on:click="" class="input">{{cmd._data}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="column box side-panel">
      <div class="block">
        <a v-on:click="newMoveNode()" class="button is-info is-outlined" id="move-btn">MOVE_NODE
        </a><br/>
        <a v-on:click="newDataNode()" class="button is-info is-outlined" id="data-btn">DATA_NODE
        </a><br/>
        <a v-on:click="newConditionNode()" class="button is-info is-outlined" id="data-btn">WAIT_NODE
        </a><br/>
        <a v-on:click="newConditionNode()" class="button is-info is-outlined" id="data-btn">CONDITION_NODE
        </a><br/>
      </div>
      <br/>
      <a v-on:click="saveGraph()" class="button is-danger">SAVE</a>
      <br/>
      <br/>
      <a v-on:click="buildAndRun()" class="button is-danger">BUILD AND RUN</a>
    </div>
  </div>
</template>

<script>
import Block from './block/Block.js'
import StartBlock from './block/StartBlock.js'
import Connection from './block/Connection.js'
import blockFactory from './block/blockFactory.js'

import Point2d from './include/model/Point2d.js'

export default {
  props: ['currentRobot', 'robots', 'webSocket'],
  data () {
    return {
      cursorPos: {},
      instance: null
    }
  },
  computed: {
    ready: function () {
      return this.currentRobot !== null
    }
  },
  watch: {
    currentRobot: function () {
      let vm = this

      if (!vm.currentRobot) {
        return
      }
      vm.instance = vm.currentRobot._graph

      vm.instance.bind('click', function (c) {
        console.log(c)
        vm.deleteConnection(c)
        vm.instance.deleteConnection(c)
      })

      vm.instance.setSuspendDrawing(true)

      vm.$nextTick(function () {
        for (var i in vm.currentRobot._commands) {
          var command = vm.currentRobot._commands[i]

          if (command instanceof Block) {
            var newNode = document.getElementById(`${command._id}`)
            vm.initNode(newNode, command)
            if (command instanceof StartBlock) {
              vm.currentRobot._startBlock = command
            }
          } else if (command instanceof Connection) {
            // check connection TODO: define method
            vm.initConnection(command)
          }
        }
      })

      vm.instance.setSuspendDrawing(false, true)
    }
  },
  methods: {
    getMousePos (e) {
      this.cursorPos = {
        x: e.clientX,
        y: e.clientY
      }
    },
    initNode (node, command) {
      let vm = this

      if (!vm.instance) {
        return
      }

      var nodeOption = command._nodeOption
      var targetOption = command._targetOption
      vm.instance.makeSource(node, nodeOption)
      if (targetOption) {
        vm.instance.makeTarget(node, targetOption)
      }
      // initialize draggable elements.
      vm.instance.draggable(node, {
        grid: [10, 10]
      })
    },
    initConnection (command) {
      let vm = this
      if (vm.currentRobot._commands[command._sourceNode] &&
          vm.currentRobot._commands[command._targetNode] &&
          !vm.currentRobot._commands[command._sourceNode]._nextBlock) {
        vm.instance.connect({
          source: command._sourceNode,
          target: command._targetNode,
          anchors: ['Right', 'Left']
        })
      } else {
        delete vm.currentRobot._commands[command._id]
      }
    },
    deleteConnection (connection) {
      let vm = this

      for (var i in vm.currentRobot._commands) {
        var command = vm.currentRobot._commands[i]
        if (command instanceof Connection) {
          if (command._sourceNode === connection.sourceId && command._targetNode === connection.targetId) {
            console.log(command)
            delete vm.currentRobot._commands[i]
          }
        }
      }
    },
    newMoveNode () {
      let vm = this

      if (!vm.currentRobot) {
        return
      }
      var command = blockFactory({
        _type: 'MoveBlock',
        _point: new Point2d(0, 1, 0),
        _time: 1
      })
      vm.$set(vm.currentRobot._commands, command._id, command)

      vm.instance.setSuspendDrawing(true)

      vm.$nextTick(function () {
        vm.initNode(document.getElementById(command._id), command)
      })
      vm.instance.setSuspendDrawing(false, true)
    },
    newDataNode () {
      let vm = this

      if (!vm.currentRobot) {
        return
      }

      var command = blockFactory({
        _type: 'DataBlock',
        _data: 1
      })
      vm.$set(vm.currentRobot._commands, command._id, command)

      vm.instance.setSuspendDrawing(true)

      vm.$nextTick(function () {
        vm.initNode(document.getElementById(command._id), command)
      })
      vm.instance.setSuspendDrawing(false, true)
    },
    deleteNode (cmd) {
      if (cmd._type === 'StartBlock') {
        return
      }
      this.instance.remove(cmd._id)
      delete this.currentRobot._commands[cmd._id]
    },
    saveGraph () {
      this.currentRobot.saveCommand()
    },
    buildAndRun () {
      this.$emit('buildAndRun')
    }
  }
}
</script>

<style scoped>
@import url('../../../../node_modules/jsplumb/dist/css/jsplumbtoolkit-defaults.css');
@import url('./css/graph-theme.css');

#diagramContainer {
  border: 1px solid gray;
  margin: 0 20px;
  height: 70vh; 
  width: 60vw;
  position: relative;
  background-color: #eee
}
      
.item {
  top:20px;
  position: absolute;
  border: 1px solid blue;
}

.demo {
  /* for IE10+ touch devices */
  touch-action:none;
}

.aLabel {
  -webkit-transition: background-color 0.25s ease-in;
  -moz-transition: background-color 0.25s ease-in;
  transition: background-color 0.25s ease-in;
}

.aLabel.jtk-hover, .jtk-source-hover, .jtk-target-hover {
  background-color: #1e8151;
  color: white;
}

.aLabel {
  background-color: white;
  opacity: 0.8;
  padding: 0.3em;
  border-radius: 0.5em;
  border: 1px solid #346789;
  cursor: pointer;
}

.input {
  position: absolute;
  bottom: 10%;
  left: 10px;
  font-size: 6px;
  cursor: pointer;
  -webkit-transition: -webkit-box-shadow 0.25s ease-in;
  -moz-transition: -moz-box-shadow 0.25s ease-in;
  transition: box-shadow 0.25s ease-in;
}

.ep:hover {
  box-shadow: 0 0 6px black;
}

.target:hover {
  box-shadow: 0 0 6px black;
}

.statemachine-demo .jtk-endpoint {
  z-index: 3;
}

.dragHover {
  border: 2px solid orange;
}

path, .jtk-endpoint { cursor:pointer; }

.side-panel {
  min-width: 150px;
  max-width: 200px;
}
</style>
