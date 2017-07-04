<template>
  <div>
    <div id="diagramContainer">
        <vue-draggable-resizable :minw="100" :minh="100" :w="100" :h="100" :x="0" :y="0" :parent="true" id="item_left" class="item">item_left</vue-draggable-resizable>
        <vue-draggable-resizable :minw="100" :minh="100" :w="100" :h="100" :x="100" :y="0" :parent="true" id="item_right" class="item">item_right</vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
  var jsPlumb = require('../../../../node_modules/jsplumb/dist/js/jsplumb.js').jsPlumb

  jsPlumb.ready(function () {
    jsPlumb.connect({
      source: 'item_left',
      target: 'item_right',
      endpoint: 'Rectangle'
    })

    jsPlumb.draggable('item_left', {containment: 'parent'})
    jsPlumb.draggable('item_right', {containment: 'parent'})
  })
  export default {
    props: ['robot', 'robots'],
    methods: {
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
