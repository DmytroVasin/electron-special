import path from 'path';
import url from 'url';
import {app, BrowserWindow, Menu} from 'electron';
import MenuBuilder from './menu';
import debounce from 'lodash/debounce'

import initEventBus from './main/eventBus';
import Database from './helpers/db.js';
import { configureUpdater, checkUpdater } from './main/app_updater';
import { CHECK_UPDATE_TIMEOUT, SMALL_WIDTH, SMALL_HEIGHT } from './constants/app'

const isDevelopment = (process.env.NODE_ENV === 'development');

let mainWindow = null;
let forceQuit = false;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

// crashReporter.start({
//   productName: 'YourName',
//   companyName: 'YourCompany',
//   submitURL: 'https://your-domain.com/url-to-submit',
//   uploadToServer: false
// });

const watchWindowDimentions = win => {
  win.on('resize',
    debounce(() => {
      const [width, height] = win.getSize()
      Database.setIn('window.dimensions', { width, height })
      console.log('window dimensions saved')
    }, 100)
  )

  win.on('move',
    debounce(() => {
      const [x, y] = win.getPosition()
      Database.setIn('window.positions', { x, y })
      console.log('window position saved');
    }, 100)
  )
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  initEventBus()

  const savedPositions = Database.getIn('window.positions', null)
  const savedDimentions = Database.getIn('window.dimensions', { width: SMALL_WIDTH, height: SMALL_HEIGHT })

  mainWindow = new BrowserWindow({
    width: savedDimentions.width,
    height: savedDimentions.height,
    show: false,
    frame: false,
    hasShadow: false,
    transparent: true,
    resizable: false,
    vibrancy: 'dark',
  });

  if (savedPositions) {
    mainWindow.setPosition(savedPositions.x, savedPositions.y)
  }

  configureUpdater(mainWindow)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // show window once on first load
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show()

    // if (process.env.NODE_ENV === 'production') {
      setTimeout(checkUpdater, CHECK_UPDATE_TIMEOUT)
    // }
  });

  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    if (process.platform === 'darwin') {
      app.on('activate', () => {
        mainWindow.show();
      });

      app.on('before-quit', () => {
        forceQuit = true;
      });
    } else {
      mainWindow.on('closed', () => {
        mainWindow = null;
      });
    }
  });

  watchWindowDimentions(mainWindow);

  if (isDevelopment) {
    mainWindow.webContents.openDevTools({ detach: true });
  }

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});
