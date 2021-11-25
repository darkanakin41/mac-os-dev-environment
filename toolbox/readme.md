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
dt git online # Open the current repository in web browser
dt git fetch # Update related git repositories
dt git update # Update related git repositories
```

### Docker
```shell
dt docker start # Start the stack
dt docker stop # Stop the stack
dt docker restart # Restart the stack
dt docker get-command # Get the full docker-compose command to be executed
```

### Mutagen
```shell
dt mutagen start # Start the synchronization
dt mutagen stop # Stop the synchronization
dt mutagen restart # Restart the synchronization
```

### Stack
```shell
dt stack start # Start the both docker and mutagen in the right order
dt stack stop # Stop the both docker and mutagen in the right order
dt stack restart # Restart the both docker and mutagen in the right order
```

### Symfony
```shell
dt symfony add-idea-env # Add configuration to .env.local to open idea from profiler
dt symfony check # Execute a list of checks on symfony project
```

## Used documentations : 

* https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/
* https://baptiste-wicht.com/posts/2014/07/pm-011-a-simple-workspace-manager-for-git-projects.html
