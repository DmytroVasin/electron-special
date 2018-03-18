import Store from 'electron-store'

class Database {
  constructor() {
    this.settingsStore = new Store({
      name: 'settings',
      // encryptionKey: 'electron-special',
    })
  }

  getIn(path, defaultValue = null) {
    return this.settingsStore.get(path, defaultValue)
  }

  setIn(path, value) {
    return this.settingsStore.set(path, value)
  }

  clear() {
    this.settingsStore.clear();
    return true
  }

  _dbPath() {
    return this.settingsStore.path
  }
}

export default new Database()
