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
        @sendCommand='sendCommand'
        ></Console>
      </div>
    </main>
  </div>
</template>

<script>
import RobotSelection from './LandingPage/RobotSelection'
import Console from './LandingPage/Console'
import Robot from './LandingPage/include/Robot.js'

const omniDirectionVelTransform = require('./LandingPage/include/omniDirectionVelTransform.js')

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
      } else {
        this.selectedRobots.splice(this.selectedRobots.indexOf(robot), 1)
      }
    },
    initRobot (_robot) {
      this.robots.push(new Robot(_robot.name, _robot.ip, _robot.platform))
    },
    async sendCommand () {
      var startTime = new Date().getTime()
      var timeLimit = 5000
      while (new Date().getTime() - startTime < timeLimit) {
        // Timesharing
        var now = new Date().getTime()
        if ((now - startTime) % 100 === 0) {
          console.log('send!!')
        }
        if ((now - startTime) % 100 === 10) {
          if (this.selectedRobots.indexOf(this.robots[5]) !== -1) {
            this.robots[5]._ws.send(JSON.stringify({id: '02', type: 3, data: omniDirectionVelTransform(0, 1, 0)}))
          }
        } else if ((now - startTime) % 100 === 20) {
          if (this.selectedRobots.indexOf(this.robots[0]) !== -1) {  // Captain
            this.robots[0]._ws.send(JSON.stringify({id: '02', type: 3, data: omniDirectionVelTransform(0, 1, 0)}))
          }
        } else if ((now - startTime) % 100 === 40) {
          if (this.selectedRobots.indexOf(this.robots[1]) !== -1) {  // Hulk
            this.robots[1]._ws.send(JSON.stringify({id: '02', type: 3, data: omniDirectionVelTransform(0, 1, 0)}))
          }
        } else if ((now - startTime) % 100 === 60) {
          if (this.selectedRobots.indexOf(this.robots[2]) !== -1) {  // Iron man
            this.robots[2]._ws.send(JSON.stringify({id: '02', type: 3, data: omniDirectionVelTransform(0, 1, 0)}))
          }
        } else if ((now - startTime) % 100 === 80) {
          if (this.selectedRobots.indexOf(this.robots[3]) !== -1) {  // Thor
            this.robots[3]._ws.send(JSON.stringify({id: '02', type: 3, data: omniDirectionVelTransform(0, 1, 0)}))
          }
        } else if ((now - startTime) % 100 === 80) {
          if (this.selectedRobots.indexOf(this.robots[4]) !== -1) {  // Black Widow
            this.robots[4]._ws.send(JSON.stringify({id: '02', type: 3, data: omniDirectionVelTransform(0, 1, 0)}))
          }
        }
      }
    }
  },
  mounted () {
    let vm = this
    var robotList = require('./LandingPage/data/RobotData.json').robots

    // Init robots
    for (var i = 0; i < robotList.length; i++) {
      vm.initRobot(robotList[i])
    }
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
