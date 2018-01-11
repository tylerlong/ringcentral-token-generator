import childProcess from 'child_process'
import path from 'path'
import * as R from 'ramda'
import axios from 'axios'

let ngrokPath = path.join(__dirname, process.platform, 'ngrok').replace('app.asar', 'app.asar.unpacked')
if (process.platform === 'win32') {
  ngrokPath += '.exe'
}

export const startNgrok = async (port, callback) => {
  const subprocess = childProcess.spawn(ngrokPath, ['http', port, '--log=stdout'])
  subprocess.stdout.on('data', data => {
    const message = data.toString()
    const matches = R.match(/starting web service.*addr=(\d+\.\d+\.\d+\.\d+:\d+)/, message)
    if (matches.length > 1) {
      const address = matches[1]
      const interval = setInterval(async () => {
        const r = await axios.get(`http://${address}/api/tunnels`)
        const tunnels = r.data.tunnels
        if (tunnels.length > 0) {
          clearInterval(interval)
          const publicUrl = R.filter(t => t.proto === 'https', tunnels)[0].public_url
          callback(publicUrl)
        }
      }, 100)
    }
  })
}
