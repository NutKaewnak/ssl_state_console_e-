<template>
  <div>
    <div
    @mouseup="getMousePos"
    @touchend="getMousePos"
    id="diagramContainer" 
    v-on:dblclick="jsPlumb.newNode(cursorPos.x, cursorPos.y)">
      <div id="item_left" class="w">
      item_left</div>
      <div id="item_right" class="w">
      item_right</div>

      <div class="jtk-demo-canvas canvas-wide statemachine-demo jtk-surface jtk-surface-nopan" id="canvas">
        <div class="w" id="opened">BEGIN
          <div class="ep" action="begin"></div>
        </div>
        <div class="w" id="phone1">PHONE INTERVIEW 1
          <div class="ep" action="phone1"></div>
        </div>
        <div class="w" id="phone2">PHONE INTERVIEW 2
          <div class="ep" action="phone2"></div>
        </div>
        <div class="w" id="inperson">IN PERSON
          <div class="ep" action="inperson"></div>
        </div>
        <div class="w" id="rejected">REJECTED
          <div class="ep" action="rejected"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var jsPlumb = require('../../../../node_modules/jsplumb/dist/js/jsplumb.js').jsPlumb

jsPlumb.ready(function () {
  var instance = jsPlumb.getInstance({
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
  instance.connect({
    source: 'item_left',
    target: 'item_right'
  })

  // var windows = jsPlumb.getSelector('.statemachine-demo .w')

  instance.bind('click', function (c) {
    instance.deleteConnection(c)
  })

  instance.draggable('item_left', {containment: 'parent'})
  instance.draggable('item_right', {containment: 'parent'})
})

export default {
  props: ['robot', 'robots'],
  data () {
    return {
      cursorPos: {}
    }
  },
  methods: {
    getMousePos (e) {
      this.cursorPos = {
        x: e.clientX,
        y: e.clientY
      }
    }
  }
}
</script>

<style scoped>
@import url('../../../../node_modules/jsplumb/dist/css/jsplumbtoolkit-defaults.css');
#diagramContainer {
  border: 1px solid gray;
  height: 500px; 
  width: 500px;
  position: relative;
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

#opened {
  left: 10em;
  top: 5em;
}

#phone1 {
  left: 35em;
  top: 12em;
  width: 7em;
}

#inperson {
  left: 12em;
  top: 23em;
}

#phone2 {
  left: 28em;
  top: 24em;
}

#rejected {
  left: 10em;
  top: 35em;
}

.dragHover {
  border: 2px solid orange;
}

path, .jtk-endpoint { cursor:pointer; }
</style>
