<template>
  <div>
    <div class="title">Robot Information</div>
    <div class="container">
      <div v-for="i in robots">
        <div class="items ">
          <div class="item">
            <div class="name" >{{i._name}}</div>
          </div>
          <div class="item">
            <div class="name">IP:</div><div class="value">{{i._ip}}</div>
          </div>
          <div class="item">
            <div class="name">Platform</div><div class="value">{{i._platform}}</div>
          </div>
          <div>
            <input type="checkbox" @click="selectRobot(i)">Select &nbsp;
            <button :class="['button', {'is-outlined':(i !== currentRobot)}, i._color]" @click="editRobot(i)">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['currentRobot', 'selectedRobots', 'robots'],
    methods: {
      selectRobot (ip) {
        console.log(this.robots)
        this.$emit('selectRobot', ip)
      },
      editRobot (robot) {
        this.$emit('editRobot', robot)
      }
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

  .container {
    padding: 0px 10px 0px 10px;
    margin-left: -10px;
    min-width: 150px;
    width: 180px;
    height: 75vh;
    min-height: 400px;
    overflow: scroll;
  }

  .items { 
    margin-top: 8px;
  }

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

  .button {
    height: 35px;
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 1em;
    display: inline-block;
    color: #fff;
    transition: all 0.15s ease;
    box-sizing: border-box;
  }

  button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
