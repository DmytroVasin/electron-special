import { app, Menu, shell } from 'electron';
import { sendEvent } from './main/eventBus';

export default class MenuBuilder {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    this.setupContextMenu();

    const template = process.platform === 'darwin'
      ? this.buildDarwinTemplate()
      : this.buildWinTemplate()

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    return menu
  }

  setupContextMenu() {
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props

      const menuItems = [
        { label: 'Copy', click: () => { sendEvent(this.mainWindow, { type: 'context.copy' }) } }
      ]

      if (process.env.NODE_ENV === 'development') {
        menuItems.push(
          { label: 'Inspect Element', click: () => { this.mainWindow.inspectElement(x, y) }}
        )
      }

      Menu
        .buildFromTemplate(menuItems)
        .popup(this.mainWindow)
    })
  }

  buildDarwinTemplate() {
    const subMenuAbout = {
      label: 'Electron',
      submenu: [
        { label: 'About ElectronReact', selector: 'orderFrontStandardAboutPanel:' },
        { type: 'separator' },
        { label: 'Hide ElectronReact', accelerator: 'Command+H', selector: 'hide:' },
        { label: 'Hide Others', accelerator: 'Command+Shift+H', selector: 'hideOtherApplications:' },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q', click: () => { app.quit() } }
      ]
    }
    const subMenuEdit = {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'Command+A', selector: 'selectAll:' }
      ]
    }
    const subMenuViewDev = {
      label: 'View',
      submenu: [
        { label: 'Reload', accelerator: 'Command+R', click: () => { this.mainWindow.webContents.reload() } },
        { label: 'Toggle Developer Tools', accelerator: 'Alt+Command+I', click: () => { this.mainWindow.toggleDevTools() } },
        { label: 'Toggle Full Screen', accelerator: 'Ctrl+Command+F', click: () => { this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen()) } }
      ]
    }
    const subMenuViewProd = {
      label: 'View',
      submenu: [
        { label: 'Toggle Full Screen', accelerator: 'Ctrl+Command+F', click: () => { this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen()) } }
      ]
    }
    const subMenuWindow = {
      label: 'Window',
      submenu: [
        { label: 'Minimize', accelerator: 'Command+M', selector: 'performMiniaturize:' },
        { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' }
      ]
    }
    const subMenuHelp = {
      label: 'Help',
      submenu: [
        { label: 'Learn More', click() { shell.openExternal('http://electron.atom.io') } }
      ]
    }

    const subMenuView = process.env.NODE_ENV === 'development'
      ? subMenuViewDev
      : subMenuViewProd

    return [
      subMenuAbout,
      subMenuEdit,
      subMenuView,
      subMenuWindow,
      subMenuHelp
    ]
  }

  buildWinTemplate() {
    const subMenuAbout = {
      label: '&File',
      submenu: [
        { label: '&Open', accelerator: 'Ctrl+O' },
        { label: '&Close', accelerator: 'Ctrl+W', click: () => { this.mainWindow.close() } }
      ]
    }

    const subMenuHelp = {
      label: 'Help',
      submenu: [
        { label: 'Learn More', click() { shell.openExternal('http://electron.atom.io') } }
      ]
    }

    const subMenuViewDev = {
      label: '&View',
      submenu: [
        { label: '&Reload', accelerator: 'Ctrl+R', click: () => { this.mainWindow.webContents.reload() } },
        { label: 'Toggle &Developer Tools', accelerator: 'Alt+Ctrl+I', click: () => { this.mainWindow.toggleDevTools() } }
      ]
    }
    const subMenuViewProd = {
      label: '&View',
      submenu: [
        { label: 'Toggle &Full Screen', accelerator: 'F11', click: () => { this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen()) } }
      ]
    }

    const subMenuView = process.env.NODE_ENV === 'development'
      ? subMenuViewDev
      : subMenuViewProd

    return [
      subMenuAbout,
      subMenuView,
      subMenuHelp
    ]
  }
}
