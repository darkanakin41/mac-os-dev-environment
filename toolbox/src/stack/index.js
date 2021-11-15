const start = require("./start");
const stop = require("./stop");

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
  }
}

module.exports = handle
