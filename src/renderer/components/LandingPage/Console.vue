<template>
  <div class="columns">
    <div
    @mouseup="getMousePos"
    @touchend="getMousePos"
    id="diagramContainer" 
    v-on:dblclick="newNode(cursorPos.x, cursorPos.y)"
    class="jtk-demo-canvas canvas-wide statemachine-demo jtk-surface jtk-surface-nopan column is-6">

      <div v-if="ready">
        <div v-for="cmd in currentRobot._command">
          <div class="w" :id="cmd._id" :style="`left: ${cmd._posLeft}; top: ${cmd._posTop}`">{{cmd._type}}
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
      <a v-on:click="buildAndRun()" class="button is-danger">BUILD AND RUN</a>
    </div>
  </div>
</template>

<script>
const jsPlumb = require('jsplumb/dist/js/jsplumb.js').jsPlumb

var instance = null

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
      if (vm.ready) {
        jsPlumb.setSuspendDrawing(true)
        for (var i in vm.currentRobot._command) {
          vm.$nextTick(function () {
            var newNode = document.getElementById(`${vm.currentRobot._command[i]._id}`)
            vm.initNode(newNode)
          })
        }
        jsPlumb.setSuspendDrawing(false, true)
      }
    }
  },
  methods: {
    getMousePos (e) {
      this.cursorPos = {
        x: e.clientX,
        y: e.clientY
      }
    },
    initNode (node) {
      if (!instance) {
        return
      }
      // initialize draggable elements.

      console.log(node)
      instance.draggable(node)

      instance.makeSource(node, {
        filter: '.ep',
        anchor: 'Continuous',
        connectorStyle: { stroke: '#5c96bc', strokeWidth: 2, outlineStroke: 'transparent', outlineWidth: 4 },
        connectionType: 'basic',
        extract: {
          'action': 'the-action'
        },
        maxConnections: 5,
        onMaxConnections: function (info, e) {
          alert('Maximum connections (' + info.maxConnections + ') reached')
        }
      })

      instance.makeTarget(node, {
        dropOptions: { hoverClass: 'dragHover' },
        anchor: 'Continuous',
        allowLoopback: true
      })
    },
    newNode (x, y) {
      // Fix by 3th
      var d = document.createElement('div')
      var id = Math.random() * 1000
      d.className = 'w'
      d.id = id
      d.innerHTML = id
      d.style.left = x + 'px'
      d.style.top = y + 'px'
      instance.getContainer().appendChild(d)
      this.initNode(d)
      return d
    },
    buildAndRun () {
      console.log(instance)
      this.$emit('buildAndRun')
    },
    initConnection (arr) {
      for (var i = 0; i < arr.length; i++) {
        this.initNode(arr[i], true)
      }
    }
  },
  mounted () {
    jsPlumb.ready(function () {
      instance = jsPlumb.getInstance({
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

      instance.registerConnectionType('basic', { anchor: 'Continuous', connector: 'StateMachine' })

      instance.bind('connection', function (info) {
        info.connection.getOverlay('label').setLabel(info.connection.id)
      })

      instance.bind('click', function (c) {
        instance.deleteConnection(c)
      })

      jsPlumb.fire('jsPlumbDemoNodeAdded', instance)
    })
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

.statemachine-demo .jtk-endpoint {
  z-index: 3;
}

.dragHover {
  border: 2px solid orange;
}

path, .jtk-endpoint { cursor:pointer; }
</style>
