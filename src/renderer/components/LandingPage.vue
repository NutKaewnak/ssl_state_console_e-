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
        @editRobot='editRobot'
        ></robot-selection>
      </div>

      <div class="right-side">
        <Console
        :currentRobot='currentRobot'
        @buildAndRun='buildAndRun'
        @editObjectByModal='editObjectByModal'
        ></Console>

        <div class="modal" :class="modal.status">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Edit {{modal.title}}</p>
              <button class="delete" aria-label="close" @click="resetModal()"></button>
            </header>
            <section class="modal-card-body">
              <!-- Content... ->
              <div v-for="data in modal.data">
                <input class="input" type="text" :placeholder="data">
                </br>
                </br>
              </div>
              -->
              <!---->
              W:&nbsp;<input class="input is-small" type="text" placeholder="0">
              </br></br>
              X:&nbsp;<input class="input is-small" type="text" placeholder="0">
              </br></br>
              Y:&nbsp;<input class="input is-small" type="text" placeholder="0">
              </br></br>
              Time:&nbsp;<input class="input is-small" type="text" placeholder="1">
              </br></br>
              <!---->

            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" @click="saveModalDataToObject(usingObjectInModal)">Save changes</button>
              <button class="button" @click="resetModal()">Cancel</button>
            </footer>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import RobotSelection from './LandingPage/RobotSelection'
import Console from './LandingPage/Console'
import Robot from './LandingPage/include/Robot.js'

// import Point2d from './LandingPage/include/model/Point2d.js'

const path = require('path')
let dataPath = path.normalize('LandingPage/data/')

export default {
  name: 'landing-page',
  data () {
    return {
      currentRobot: null,
      selectedRobots: [],
      robots: [],
      usingObjectInModal: null,
      modal: {
        status: 'is-active',
        title: '',
        data: null
      }
    }
  },
  components: {
    RobotSelection,
    Console
  },
  methods: {
    selectRobot (robot) {
      let vm = this

      if (vm.selectedRobots.indexOf(robot) === -1) {
        robot.initWebSocket()
        robot.loadCommand()
        vm.selectedRobots.push(robot)
      } else {
        vm.selectedRobots.splice(vm.selectedRobots.indexOf(robot), 1)
      }
    },
    editRobot (robot) {
      let vm = this

      if (vm.currentRobot) {
        vm.currentRobot._graph.reset()
        vm.currentRobot = null
      }
      robot.initWebSocket()
      robot.loadCommand()
      robot.initGraph()

      vm.$nextTick(() => { vm.currentRobot = robot })
    },
    isSelected (robot) {
      return this.selectedRobots.indexOf(robot) !== -1
    },
    initRobot (_robot) {
      this.robots.push(new Robot(_robot.name, _robot.ip, _robot.platform, _robot.path, _robot.color))
    },
    editObjectByModal (object) {
      let vm = this
      console.log(object)
      vm.modal.status = 'is-active'
      vm.modal.data = object._point
      vm.modal.title = object._type
    },
    saveModalDataToObject (object) {
      this.resetModal()
    },
    resetModal () {
      this.modal = {
        status: '',
        title: '',
        data: null
      }
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
      var timeLimit = 5100  // check battery instead

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
    async timeSlotChecker (deltaTime) {
      switch ((deltaTime) % 100) {
        case 10:
          if (this.isSelected(this.robots[5])) {
            this.robots[5]._currentBlock.execute(this.robots[5])
          }
          break
        case 20:
          if (this.isSelected(this.robots[0])) {  // Captain
            this.robots[0]._currentBlock.execute(this.robots[0])
          }
          break
        case 40:
          if (this.isSelected(this.robots[1])) {  // Hulk
            this.robots[1]._currentBlock.execute(this.robots[1])
          }
          break
        case 60:
          if (this.isSelected(this.robots[2])) {  // Iron man
            this.robots[2]._currentBlock.execute(this.robots[2])
          }
          break
        case 80:
          if (this.isSelected(this.robots[3])) {  // Thor
            this.robots[3]._currentBlock.execute(this.robots[3])
          }
          break
        case 0:
          if (this.isSelected(this.robots[4])) {  // Black Widow
            this.robots[4]._currentBlock.execute(this.robots[4])
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
    padding: 50px 50px;
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
    margin-top: 5vh;
    flex-direction: column;
    flex: 1 100%;
  }
</style>
