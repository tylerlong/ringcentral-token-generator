import electron from 'electron'
import { startService } from './service'

process.once('loaded', () => {
  global.platform = process.platform
  global.electron = electron.remote
  global.startService = startService
  global.dev = process.env.NODE_ENV !== 'production'
})
