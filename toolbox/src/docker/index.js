const start = require("./start");
const stop = require("./stop");
const getCommand = require("./getCommand");

function handle (action) {
  switch(action){
    case "start":
      start()
      break;
    case "stop":
      stop()
      break;
    case "restart":
      stop()
      start()
      break;
    case "get-command":
      getCommand()
      break;
  }
}

module.exports = handle
