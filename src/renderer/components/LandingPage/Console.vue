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
          <div class="w" :id="cmd._id">{{cmd._type}}
            <div class="ep" :action="cmd._id"></div>
          </div>
        </div>
      </div>

      <!--
      <div class="w" id="opened">BEGIN
        <div class="ep" action="begin"></div>
      </div>
      <div class="w" id="phone1">MOVE 1, 0
        <div class="ep" action="move"></div>
      </div>
      <div class="w" id="rotate">ROTATE 90
        <div class="ep" action="rotate"></div>
      </div>
      <div class="w" id="inperson">MOVE 1, 0
        <div class="ep" action="move"></div>
      </div>
      <div class="w" id="kick">KICK
        <div class="ep" action="kick"></div>
      </div>
      -->
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

      // this is not part of the core demo functionality; it is a means for the Toolkit edition's wrapped
      // version of this demo to find out about new nodes being added.
      //
      instance.fire('jsPlumbDemoNodeAdded', node)
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

      instance.connect({ source: 'opened', target: 'phone1', type: 'basic' })
      instance.connect({ source: 'phone1', target: 'rotate', type: 'basic' })
      instance.connect({ source: 'rotate', target: 'inperson', type: 'basic' })
    }
  },
  mounted () {
    let vm = this

    jsPlumb.ready(function () {
      instance = jsPlumb.getInstance({
        endpoint: ['Dot', {radius: 2}],
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

      window.jsp = instance

      instance.registerConnectionType('basic', { anchor: 'Continuous', connector: 'StateMachine' })

      instance.bind('connection', function (info) {
        info.connection.getOverlay('label').setLabel(info.connection.id)
      })

      instance.bind('click', function (c) {
        instance.deleteConnection(c)
      })

      vm.initConnection(jsPlumb.getSelector('.statemachine-demo .w'))

      instance.connect({
        source: 'inperson',
        target: 'kick',
        type: 'basic'
      })

      jsPlumb.fire('kuykuy', instance)
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
  font-size: 11px;
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
