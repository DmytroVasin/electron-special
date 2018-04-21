import { autoUpdater } from 'electron-updater'
import { sendEvent } from './eventBus'

export const checkUpdater = () => {
  autoUpdater.checkForUpdates()
}

export const downloadUpdater = () => {
  autoUpdater.downloadUpdate()
}

export const relunchUpdater = () => {
  autoUpdater.quitAndInstall()
}

export const configureUpdater = (mainWindow) => {
  autoUpdater.autoDownload = false

  setupBindings(mainWindow)
}

const setupBindings = (mainWindow) => {
  autoUpdater.on('checking-for-update', () => {
    sendEvent(mainWindow, { type: 'updater.checking' })
  })

  autoUpdater.on('update-available', (info) => {
    sendEvent(mainWindow, { type: 'updater.updateAvailable', data: info })
  })

  autoUpdater.on('update-not-available', (info) => {
    sendEvent(mainWindow, { type: 'updater.updateNotAvailable', data: info })
  })

  autoUpdater.on('error', (err) => {
    // TODO: Add Sentry notification
    const data = { message: JSON.stringify(err) }
    sendEvent(mainWindow, { type: 'updater.error', data })
  })

  autoUpdater.on('download-progress', (progressObj) => {
    const data = { percents: progressObj.percent }

    sendEvent(mainWindow, { type: 'updater.downloadProgress', data })
  })

  autoUpdater.on('update-downloaded', (info) => {
    sendEvent(mainWindow, { type: 'updater.downloaded', data: info })
  })
}
