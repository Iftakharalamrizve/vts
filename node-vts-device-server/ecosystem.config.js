module.exports = {
    apps: [
      {
        name: 'britto-app-node-server',
        exec_mode: 'cluster',
        instances: 'max', // Or a number of instances
        script: './server.js',
        args: 'start'
      }
    ]
  }
  