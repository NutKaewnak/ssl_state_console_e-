<template>
  <div>
    <div id="diagramContainer">
        <vue-draggable-resizable id="item_left" class="item"></vue-draggable-resizable>
        <vue-draggable-resizable id="item_right" class="item"></vue-draggable-resizable>
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
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }

  button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  button.alt {
    color: #42b983;
    background-color: transparent;
  }

  #diagramContainer {
    border: 1px solid gray;
    height: 500px; 
    width: 500px;
    position: relative;
  }
        
  .item {
      top:20px;
      position: absolute;
      height:80px; width: 80px;
      border: 1px solid blue;
  }
</style>
