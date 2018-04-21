import { ipcMain } from 'electron'
import chalk from 'chalk'
import objectPath from 'object-path'

import { checkUpdater, downloadUpdater, relunchUpdater } from './app_updater'

const log = (title, message) => {
  console.log(chalk.yellow.bold(title), message)
}

export const sendEvent = (window, payload) => {
  window.webContents.send('toRenderer', {
    type: payload.type,
    data: payload.data
  })

  log('Main SendEvent Type:', payload.type)
  log('Main SendEvent Data:', payload.data)
}

export default () => {
  const handlers = {
    updater: {
      check: checkUpdater,
      download: downloadUpdater,
      relunch: relunchUpdater
    }
  }

  ipcMain.on('toMain', (event, payload) => {
    const { type, data } = payload
    const handler = objectPath.get(handlers, type.split('.'))
    if (!handler) {
      log('Receive event: ', 'Wrong event!')
      return
    }
    log('Receive event: ', type)
    handler(data)
  })
}
