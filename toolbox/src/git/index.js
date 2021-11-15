const update = require("./update");

function handle (action) {
  switch(action){
    case "update":
      update()
      break;
  }
}

module.exports = handle
