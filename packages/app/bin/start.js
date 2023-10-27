#!/usr/bin/env node
const electron = require('electron')
const spawn = require('cross-spawn')
const argv = process.argv.slice(2)

function getPort() {
  if (argv[0] === '--port' || argv[0] === '-p') {
    const port = Number(argv[1])
    if (!isNaN(port)) {
      process.env.FSDT_PORT = port // add port to env
      return
    }
  }

  throw new Error('Port is not defined')
}

function startElectronApp() {
  getPort()
  const result = spawn.sync(electron, [require.resolve('../.webpack/main/index')].concat(argv), {
    stdio: 'ignore',
  })

  process.exit(result.status)
}

startElectronApp()
