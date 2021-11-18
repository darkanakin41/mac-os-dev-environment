const update = require("./update");
const online = require("./online");

function handle (action) {
  switch(action){
    case "update":
      update()
      break;
    case "online":
      online()
      break;
  }
}

module.exports = handle
