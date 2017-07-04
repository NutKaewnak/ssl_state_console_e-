<template>
  <div>
    <div
    @mouseup="handleClick"
    @touchend="handleClick"
    id="diagramContainer" 
    v-on:dblclick="jsPlumb.newNode(cursorPos.top, cursorPos.left)">
      <vue-draggable-resizable :minw="100" :minh="100" :w="100" :h="100" :x="0" :y="0" :parent="true" id="item_left" class="item">
      item_left</vue-draggable-resizable>
      <vue-draggable-resizable :minw="100" :minh="100" :w="100" :h="100" :x="100" :y="0" :parent="true" id="item_right" class="item">
      item_right</vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
var jsPlumb = require('../../../../node_modules/jsplumb/dist/js/jsplumb.js').jsPlumb

jsPlumb.ready(function () {
  jsPlumb.connect({
    source: 'item_left',
    target: 'item_right',
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
    Container: 'canvas'
  })

  jsPlumb.draggable('item_left', {containment: 'parent'})
  jsPlumb.draggable('item_right', {containment: 'parent'})
})

export default {
  props: ['robot', 'robots'],
  data () {
    return {
      cursorPos: {}
    }
  },
  methods: {
    handleClick (e) {
      this.cursorPos = {
        top: e.clientY,
        left: e.clientX
      }
    }
  }
}
</script>

<style scoped>
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
</style>
