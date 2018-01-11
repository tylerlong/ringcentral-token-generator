import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const urls = {
  darwin: 'https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-darwin-amd64.zip',
  win32: 'https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-windows-amd64.zip',
  linux: 'https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip'
}

const download = async (platform, done) => {
  console.log(`downloading ngrok for ${platform}`)
  const response = await axios({
    method: 'get',
    url: urls[platform],
    responseType: 'stream'
  })
  const stream = response.data.pipe(fs.createWriteStream(path.join(__dirname, platform, 'ngrok.zip')))
  stream.on('finish', () => {
    done()
  })
}

download('darwin', () => {
  execSync(`cd ${path.join(__dirname, 'darwin')} && rm -rf ngrok && 7z x ngrok.zip && rm ngrok.zip && chmod a+x ngrok`)
})
download('win32', () => {
  execSync(`cd ${path.join(__dirname, 'win32')} && rm -rf ngrok.exe && 7z x ngrok.zip && rm ngrok.zip && chmod a+x ngrok.exe`)
})
download('linux', () => {
  execSync(`cd ${path.join(__dirname, 'linux')} && rm -rf ngrok && 7z x ngrok.zip && rm ngrok.zip && chmod a+x ngrok`)
})
