(function () {
  var app, config, express, http, io

  express = require('express')

  app = express()

  http = require('http').Server(app)

  io = require('socket.io')(http)

  config = {
    port: 8080,
    x64: false
  }

  io.on('connection', function (socket) {
    socket.on('disconnect', function () {
      if (socket.gamePadId !== void 0) {
        return null
      }
    })
    socket.on('connectGamepad', function () {
      return null
    })
    return socket.on('padEvent', function (data) {
      console.log(data)
      if (socket.gamePadId !== void 0 && data) {
        return null
      }
    })
  })

  http.listen(config.port, function () {
    return console.info('Listening on ' + config.port)
  })
}).call(this)
