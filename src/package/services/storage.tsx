const StorageService = ({
  isReady: function () {
    return !!window && !!window.localStorage
  },
  set: function (key: string, data: any) {
    if (!this.isReady()) throw new Error("Cannot find localStorage")
    localStorage.setItem(key, JSON.stringify(data))
    return true
  },
  get: function (key: string) {
    if (!this.isReady()) throw new Error("Cannot find localStorage")
    if (localStorage.hasOwnProperty(key)) {
      return JSON.parse(localStorage.getItem(key) || "")
    }
    return null
  },
  remove: function (key: string) {
    if (!this.isReady()) throw new Error("Cannot find localStorage")
    localStorage.removeItem(key)
    return true
  },
})

function makeStorage(name) {
  return {
    get: () => StorageService.get(name),
    set: (value) => StorageService.set(name, value),
  }
}

export const storage = {
  music: makeStorage("music"),
  audio: makeStorage("audio"),
  voice: makeStorage("voice"),
}
