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
          :class="`${cmd._type} jtk-droppable jtk-draggable`" :id="cmd._id"
          :style="`left: ${cmd._posLeft}; top: ${cmd._posTop}`">
          {{cmd._type}}

            <div v-if="cmd._targetOption" class="target"></div>
            <div v-if="cmd._type==='ConditionBlock' || 
            cmd._type==='PlusBlock' ||
            cmd._type==='MinusBlock' ||
            cmd._type==='MultBlock' ||
            cmd._type==='DivideBlock' ||
            cmd._type==='SqrtBlock' ||

            cmd._type==='SetValueBlock' ||

            cmd._type==='GreatherBlock' ||
            cmd._type==='LeaserBlock' ||
            cmd._type==='EquivalentBlock' ||
            cmd._type==='AndBlock' ||
            cmd._type==='OrBlock' ||
            cmd._type==='ConditionBlock'"
            class="targetData" ></div>
            <div v-if="cmd._type==='ConditionBlock'" class="epTrue" :action="cmd._type"></div>
            <div v-if="cmd._type==='ConditionBlock' ||
            cmd._type==='SetValueBlock' || 
            cmd._type==='AndBlock' ||
            cmd._type==='OrBlock'" 
            class="epFalse" :action="cmd._type"></div>
            <div v-else class="ep" :action="cmd._type"></div>
            </br>

            <div v-if="cmd._type === 'MoveBlock'" v-on:click="editObjectByModal(cmd)" class="input is-small" style="width:90px">{{cmd._point}}</div>
            <div v-if="cmd._type === 'DataBlock'" v-on:click="editObjectByModal(cmd)" class="input is-small" style="width:50px">{{cmd._data}}</div>
            <div v-if="cmd._type === 'WaitBlock'" v-on:click="editObjectByModal(cmd)" class="input is-small" style="width:50px">{{cmd._time}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="column box side-panel">
      <div class="block container">
        <button v-on:click="newMoveNode()" class="button is-info is-outlined" id="move-btn">MOVE_NODE
        </button><br/>
        <button v-on:click="newDataNode()" class="button is-info is-outlined" id="data-btn">DATA_NODE
        </button><br/>
        <button v-on:click="newWaitNode()" class="button is-info is-outlined" id="data-btn">WAIT_NODE
        </button><br/>
        <button v-on:click="newPlusNode()" class="button is-info is-outlined" id="data-btn">PLUS_NODE
        </button><br/>
        <button v-on:click="newMinusNode()" class="button is-info is-outlined" id="data-btn">MINUS_NODE
        </button><br/>
        <button v-on:click="newMultiplyNode()" class="button is-info is-outlined" id="data-btn">MULTIPLY_NODE
        </button><br/>
        <button v-on:click="newDivideNode()" class="button is-info is-outlined" id="data-btn">DIVIDE_NODE
        </button><br/>
        <button v-on:click="newSqrtNode()" class="button is-info is-outlined" id="data-btn">SQRT_NODE
        </button><br/>
        <button v-on:click="newSetValueNode()" class="button is-info is-outlined" id="data-btn">SET_VALUE_NODE
        </button><br/>
        <button v-on:click="newGreatherNode()" class="button is-info is-outlined" id="data-btn">GREATHER_NODE
        </button><br/>
        <button v-on:click="newLesserNode()" class="button is-info is-outlined" id="data-btn">LESSER_NODE
        </button><br/>
        <button v-on:click="newEquivalentNode()" class="button is-info is-outlined" id="data-btn">EQUIVALENT_NODE
        </button><br/>
        <button v-on:click="newAndNode()" class="button is-info is-outlined" id="data-btn">AND_NODE
        </button><br/>
        <button v-on:click="newOrNode()" class="button is-info is-outlined" id="data-btn">OR_NODE
        </button><br/>
        <button v-on:click="newConditionNode()" class="button is-info is-outlined" id="data-btn">CONDITION_NODE
        </button><br/>
      </div>
      <br/>
      <button v-on:click="saveGraph()" class="button is-danger">SAVE</button>
      <br/>
      <br/>
      <button v-on:click="buildAndRun()" class="button is-danger">BUILD AND RUN</button>
      <br/>
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
      // initialize draggable elements.
      vm.instance.draggable(node, {
        grid: [20, 20]
      })

      var nodeOption = command._nodeOption
      var targetOption = command._targetOption
      vm.instance.makeSource(node, nodeOption)
      if (targetOption) {
        vm.instance.makeTarget(node, targetOption)

        var targetOption2 = {
          dropOptions: { hoverClass: 'dragHover' },
          anchor: 'BottomLeft',
          allowLoopback: false
        }

        vm.instance.makeTarget(node, targetOption2)
        console.log('kuy')
      }
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
            vm.$delete(vm.currentRobot._commands[i])
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
        _point: new Point2d(0, 0, 0),
        _time: 1
      })
      vm.instance.setSuspendDrawing(true)
      vm.$set(vm.currentRobot._commands, command._id, command)
      vm.$nextTick(function () {
        var node = document.getElementById(command._id)
        vm.initNode(node, command)
      })

      vm.instance.setSuspendDrawing(false)
    },
    newWaitNode () {
      let vm = this

      if (!vm.currentRobot) {
        return
      }
      var command = blockFactory({
        _type: 'WaitBlock',
        _time: 1
      })
      vm.instance.setSuspendDrawing(true)
      vm.$set(vm.currentRobot._commands, command._id, command)
      vm.$nextTick(function () {
        var node = document.getElementById(command._id)
        vm.initNode(node, command)
      })

      vm.instance.setSuspendDrawing(false)
    },
    newPlusNode () {
      let vm = this

      if (!vm.currentRobot) {
        return
      }

      var command = blockFactory({
        _type: 'PlusBlock',
        _input1: 0,
        _input2: 5
      })
      vm.$set(vm.currentRobot._commands, command._id, command)

      vm.instance.setSuspendDrawing(true)

      vm.$nextTick(function () {
        vm.initNode(document.getElementById(command._id), command)
      })
      vm.instance.setSuspendDrawing(false)
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
      vm.instance.setSuspendDrawing(false)
    },
    newConditionNode () {
      let vm = this

      if (!vm.currentRobot) {
        return
      }

      var command = blockFactory({
        _type: 'ConditionBlock'
      })
      vm.$set(vm.currentRobot._commands, command._id, command)

      vm.instance.setSuspendDrawing(true)

      vm.$nextTick(function () {
        vm.initNode(document.getElementById(command._id), command)
      })
      vm.instance.setSuspendDrawing(false)
    },
    deleteNode (cmd) {
      let vm = this
      if (cmd._type === 'StartBlock') {
        return
      }

      vm.instance.setSuspendDrawing(true)
      vm.$nextTick(() => {
        vm.instance.remove(cmd._id)
        vm.$delete(vm.currentRobot._commands[cmd._id])
      })

      vm.instance.setSuspendDrawing(false)
    },
    saveGraph () {
      this.currentRobot.saveCommand()
    },
    buildAndRun () {
      this.$emit('buildAndRun')
    },
    editObjectByModal (object) {
      let vm = this

      vm.instance.setSuspendDrawing(true)
      this.$emit('editObjectByModal', object)
      vm.instance.setSuspendDrawing(false)
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

.container {
  padding: 0px 10px 0px 10px;
  margin-left: -10px;
  min-width: 150px;
  width: 180px;
  height: 58vh;
  min-height: 200px;
  overflow: scroll;
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
