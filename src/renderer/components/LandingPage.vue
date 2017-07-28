<template>
  <div id="wrapper">
    <div id="logo">SSL Console</div>
    <main>
      <div class="left-side">
        <robot-selection
        :currentRobot='currentRobot'
        :robots='robots'
        @selectRobot='selectRobot'
        ></robot-selection>
      </div>

      <div class="right-side">
        <Console
        :currentRobot='currentRobot'
        :webSocket='webSocket'
        ></Console>
      </div>
    </main>
  </div>
</template>

<script>
import RobotSelection from './LandingPage/RobotSelection'
import Console from './LandingPage/Console'
import Robot from './LandingPage/include/Robot.js'

export default {
  name: 'landing-page',
  data () {
    return {
      currentRobot: null,
      robots: [],
      webSocket: null
    }
  },
  components: {
    RobotSelection,
    Console
  },
  methods: {
    selectRobot (robot) {
      this.currentRobot = robot
      console.log(this.currentRobot)
    },
    initRobot (_robot) {
      this.robots.push(new Robot(_robot.name, _robot.ip, _robot.platform))
    }
  },
  mounted () {
    let vm = this
    var robotList = require('./LandingPage/data/RobotData.json').robots
    for (var i = 0; i < robotList.length; i++) {
      vm.initRobot(robotList[i])
    }
    console.log(this.robots)
  }
}
</script>

<style>
  @import '../../../node_modules/bulma/css/bulma.css';
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css')

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    color: #560f35;
    height: auto;
    font-size: 50px;
    font-weight: bold;
    margin-top: -15px;
    margin-left: -15px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: flex-start;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
    flex: 1 40%;
  }

  .right-side {
    display: flex;
    flex-direction: column;
    flex: 1 100%;
  }
</style>
