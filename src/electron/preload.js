import electron from 'electron'

process.once('loaded', () => {
  global.platform = process.platform
  global.electron = electron.remote
})
