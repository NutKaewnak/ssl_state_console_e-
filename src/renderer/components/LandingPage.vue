<template>
  <div id="wrapper">
    <div id="logo">SSL Console</div>
    <main>
      <div class="left-side">
        <robot-selection
        :currentRobot='currentRobot'
        :selectedRobots='selectedRobots'
        :robots='robots'
        @selectRobot='selectRobot'
        ></robot-selection>
      </div>

      <div class="right-side">
        <Console
        :currentRobot='currentRobot'
        @buildAndRun='buildAndRun'
        ></Console>
      </div>
    </main>
  </div>
</template>

<script>
import RobotSelection from './LandingPage/RobotSelection'
import Console from './LandingPage/Console'
import Robot from './LandingPage/include/Robot.js'

const path = require('path')
let dataPath = path.normalize('LandingPage/data/')

export default {
  name: 'landing-page',
  data () {
    return {
      currentRobot: null,
      selectedRobots: [],
      robots: []
    }
  },
  components: {
    RobotSelection,
    Console
  },
  methods: {
    selectRobot (robot) {
      this.currentRobot = robot
      if (this.selectedRobots.indexOf(robot) === -1) {
        this.selectedRobots.push(robot)
        robot.initWebSocket()
      } else {
        this.selectedRobots.splice(this.selectedRobots.indexOf(robot), 1)
      }
    },
    isSelected (robot) {
      return this.selectedRobots.indexOf(robot) !== -1
    },
    initRobot (_robot) {
      this.robots.push(new Robot(_robot.name, _robot.ip, _robot.platform, _robot.path))
    },

    async buildAndRun () {
      this.buildRobotsCommand()
      this.sendCommand()
    },
    // TODO: Implement this
    buildRobotsCommand () {
      for (var i = 0; i < this.selectedRobots.length; i++) {
        this.selectedRobots[i].buildCommand()
      }
    },

    async sendCommand () {
      var startTime = new Date().getTime()
      var timeLimit = 1000

      while (new Date().getTime() - startTime < timeLimit) {
        // Timesharing
        this.sleep(10)
        var now = new Date().getTime()
        if ((now - startTime) % 100 === 0) {
          console.log('sending data...')
        }
        this.timeSlotChecker(now - startTime)
      }
    },
    timeSlotChecker (deltaTime) {
      switch ((deltaTime) % 100) {
        case 10:
          if (this.isSelected(this.robots[5])) {
            console.log(deltaTime)
            this.robots[5].sendCommand(JSON.stringify({}))
          }
          break
        case 20:
          if (this.isSelected(this.robots[0])) {  // Captain
            this.robots[0].sendCommand(JSON.stringify({}))
          }
          break
        case 40:
          if (this.isSelected(this.robots[1])) {  // Hulk
            this.robots[1].sendCommand(JSON.stringify({}))
          }
          break
        case 60:
          if (this.isSelected(this.robots[2])) {  // Iron man
            this.robots[2].sendCommand(JSON.stringify({}))
          }
          break
        case 80:
          if (this.isSelected(this.robots[3])) {  // Iron man
            this.robots[3].sendCommand(JSON.stringify({}))
          }
          break
        case 0:
          if (this.isSelected(this.robots[4])) {  // Black Widow
            this.robots[4].sendCommand(JSON.stringify({}))
          }
          break
      }
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  },
  mounted () {
    let vm = this
    var paths = path.join(dataPath, 'RobotData.json')
    var robotList = require(`./${paths}`).robots

    // Init robots
    for (var i = 0; i < robotList.length; i++) {
      vm.initRobot(robotList[i])
    }
    vm.robots[4].loadCommand(require(`./${dataPath}${vm.robots[5]._saveFile}`))
    vm.robots[5].loadCommand(require(`./${dataPath}${vm.robots[5]._saveFile}`))
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
