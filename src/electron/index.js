import { app, BrowserWindow, shell } from 'electron'
import path from 'path'
import { autoUpdater } from 'electron-updater'
import electronLog from 'electron-log'

import { setApplicationMenu } from './menu'

electronLog.transports.file.level = 'info'
autoUpdater.logger = electronLog
autoUpdater.checkForUpdatesAndNotify()
setInterval(() => {
  autoUpdater.checkForUpdatesAndNotify()
}, 3600000) // check for updates every hour

let browserWindow = null

const createWindow = () => {
  browserWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.bundle.js')
    }
  })
  browserWindow.loadURL(path.join('file://', __dirname, 'index.html'))
  browserWindow.on('closed', () => {
    browserWindow = null
  })
  if (process.env.NODE_ENV !== 'production') {
    browserWindow.toggleDevTools()
  }
  browserWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    shell.openExternal(url) // download in user's default browser
  })
}

app.on('ready', () => {
  setApplicationMenu()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (browserWindow === null) {
    createWindow()
  }
})
