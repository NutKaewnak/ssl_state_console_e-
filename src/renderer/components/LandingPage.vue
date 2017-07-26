<template>
  <div id="wrapper">
    <div id="logo">SSL Console</div>
    <main>
      <div class="left-side">
        <robot-selection
        :robot='robot'
        :robots='robots'
        @selectRobot='selectRobot'
        ></robot-selection>
      </div>

      <div class="right-side">
        <Console
        :robot='robot'
        :webSocket='webSocket'
        ></Console>
      </div>
    </main>
  </div>
</template>

<script>
import RobotSelection from './LandingPage/RobotSelection'
import Console from './LandingPage/Console'

export default {
  name: 'landing-page',
  data () {
    return {
      robot: null,
      robots: [
        {
          ip: '192.168.0.150',
          platform: 'SSL'
        },
        {
          ip: '192.168.1.2',
          platform: 'SSL'
        }
      ],
      webSocket: null
    }
  },
  components: {
    RobotSelection,
    Console
  },
  methods: {
    selectRobot (ip) {
      this.robot = ip
      this.initWebSocket()
    },
    initWebSocket () {
      this.webSocket = new WebSocket('ws://' + this.robot + ':8081')
      console.log(this.webSocket.url)
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

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
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

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
