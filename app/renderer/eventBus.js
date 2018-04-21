import { ipcRenderer } from 'electron'
import objectPath from 'object-path'
import { writeToClipboard } from '../helpers/app'

export function sendEvent(msgType, data) {
  ipcRenderer.send('toMain', {
    type: msgType,
    data
  })

  console.log('Renderer SendEvent:', msgType)
}

export default ({ dispatch, getState }) => {
  const dispatchUpdate = (status, data = false) => dispatch({
    type: 'SET_UPDATE_STATUS',
    payload: { status, data }
  })

  const copyDisplay = () => {
    const { updater } = getState()
    writeToClipboard(updater.status)
  }

  const handlers = {
    updater: {
      checking: () => dispatchUpdate('checking'),
      updateAvailable: info => dispatchUpdate('available', info),
      updateNotAvailable: () => dispatchUpdate('unavailable'),
      error: err => dispatchUpdate('error', err),
      downloadProgress: progress => dispatchUpdate('progress', progress),
      downloaded: () => dispatchUpdate('downloaded')
    },
    context: {
      copy: () => copyDisplay()
    }
  }

  ipcRenderer.on('toRenderer', (event, payload) => {
    const { type, data } = payload
    const handler = objectPath.get(handlers, type.split('.'))

    if (!handler) {
      console.log('ReceiveEvent:', 'Wrong event!')
      return
    }
    console.log('ReceiveEvent:', type)
    return handler(data)
  })
}
