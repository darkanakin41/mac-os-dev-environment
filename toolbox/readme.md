# Docker Toolbox

## Installation
First, install dependencies :
```shell
npm install
```

Next, configure your environment by copying the `src/config.dist.js` to `src/config.js` and then update the 
values according to your needs.

Then you can run available commands.

## Commands 

### Git
```shell
docker-toolbox git update # Update related git repositories
docker-toolbox git online # Open the current repository in web browser
```

### Docker
```shell
docker-toolbox docker start # Start the stack
docker-toolbox docker stop # Stop the stack
docker-toolbox docker restart # Restart the stack
docker-toolbox docker get-command # Get the full docker-compose command to be executed
```

### Mutagen
```shell
docker-toolbox mutagen start # Start the synchronization
docker-toolbox mutagen stop # Stop the synchronization
docker-toolbox mutagen restart # Restart the synchronization
```

### Stack
```shell
docker-toolbox stack start # Start the both docker and mutagen in the right order
docker-toolbox stack stop # Stop the both docker and mutagen in the right order
docker-toolbox stack restart # Restart the both docker and mutagen in the right order
```

## Used documentations : 

* https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/
