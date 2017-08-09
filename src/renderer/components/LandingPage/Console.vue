<template>
  <div class="columns">
    <div
    @mouseup="getMousePos"
    @touchend="getMousePos"
    id="diagramContainer" 
    v-on:dblclick="newNode()"
    class="jtk-demo-canvas canvas-wide statemachine-demo jtk-surface jtk-surface-nopan column is-6">

      <div v-if="ready">
        <div v-for="cmd in currentRobot._commands">
          <div v-if="cmd._type !== 'Connection'" class="w" :id="cmd._id" :style="`left: ${cmd._posLeft}; top: ${cmd._posTop}`">{{cmd._type}}
            <div v-if="cmd._targetOption" class="target"></div>
            <div class="ep" :action="cmd._type"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="column box">
      <div class="block">
        <a class="button is-info is-outlined" id="move-btn">MOVE
        </a><br/>
        <a class="button is-info is-outlined" id="rotate-btn">ROTATE
        </a><br/>
        <a class="button is-info is-outlined" id="kick-btn">KICK
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
import Connection from './block/Connection.js'
import blockFactory from './block/blockFactory.js'

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
        vm.instance.deleteConnection(c)
      })

      vm.instance.setSuspendDrawing(true)
      vm.$nextTick(function () {
        for (var i in vm.currentRobot._commands) {
          var command = vm.currentRobot._commands[i]

          if (command instanceof Block) {
            var newNode = document.getElementById(`${command._id}`)
            vm.initNode(newNode, command)
          } else if (command instanceof Connection) {
            vm.instance.connect({
              source: command._sourceNode,
              target: command._targetNode
            })
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
      // initialize draggable elements.
      vm.instance.draggable(node)
      vm.instance.makeSource(node, nodeOption)
      if (targetOption) {
        vm.instance.makeTarget(node, targetOption)
      }
    },
    newNode () {
      let vm = this

      if (!vm.currentRobot) {
        return
      }
      var command = blockFactory({_type: 'CommandBlock'})
      vm.$set(vm.currentRobot._commands, command._id, command)

      vm.instance.setSuspendDrawing(true)

      vm.$nextTick(function () {
        vm.initNode(document.getElementById(command._id), command)
      })
      vm.instance.setSuspendDrawing(false, true)
    },
    saveGraph () {
      this.currentRobot.saveCommand()
    },
    buildAndRun () {
      this.$emit('buildAndRun')
    },
    initConnection (arr) {
      for (var i = 0; i < arr.length; i++) {
        this.initNode(arr[i], true)
      }
    }
  }
}
</script>

<style scoped>
@import url('../../../../node_modules/jsplumb/dist/css/jsplumbtoolkit-defaults.css');
#diagramContainer {
  border: 1px solid gray;
  height: 70vh; 
  width: 50vw;
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

.w {
  padding: 16px;
  position: absolute;
  z-index: 4;
  border: 1px solid #2e6f9a;
  box-shadow: 2px 2px 19px #e0e0e0;
  -o-box-shadow: 2px 2px 19px #e0e0e0;
  -webkit-box-shadow: 2px 2px 19px #e0e0e0;
  -moz-box-shadow: 2px 2px 19px #e0e0e0;
  -moz-border-radius: 8px;
  border-radius: 8px;
  opacity: 0.8;
  cursor: move;
  background-color: white;
  font-size: 10px;
  -webkit-transition: background-color 0.25s ease-in;
  -moz-transition: background-color 0.25s ease-in;
  transition: background-color 0.25s ease-in;
}

.w:hover {
  background-color: #5c96bc;
  color: white;
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

.ep {
  position: absolute;
  bottom: 37%;
  right: 5px;
  width: 1em;
  height: 1em;
  background-color: orange;
  cursor: pointer;
  box-shadow: 0 0 2px black;
  -webkit-transition: -webkit-box-shadow 0.25s ease-in;
  -moz-transition: -moz-box-shadow 0.25s ease-in;
  transition: box-shadow 0.25s ease-in;
}

.ep:hover {
  box-shadow: 0 0 6px black;
}

.target {
  position: absolute;
  bottom: 37%;
  left: 5px;
  width: 1em;
  height: 1em;
  background-color: gray;
  cursor: pointer;
  box-shadow: 0 0 2px black;
  -webkit-transition: -webkit-box-shadow 0.25s ease-in;
  -moz-transition: -moz-box-shadow 0.25s ease-in;
  transition: box-shadow 0.25s ease-in;
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
</style>
