export interface Storage {
  set(key: string, value: string): void
  get(key: string): string | null
}

class LocalStorage implements Storage {
  set(key: string, value: string) {
    window.localStorage.setItem(key, value)
  }
  get(key: string): string | null {
    return window.localStorage.getItem(key)
  }
}

class MemoryStorage implements Storage {
  private _memory: Map<string, string> = new Map()

  set(key: string, value: string): void {
    this._memory.set(key, value)
  }

  get(key: string): string | null {
    return this._memory.get(key) ?? null
  }
}

const storage = new LocalStorage()
const memoryStorage = new MemoryStorage()

export function getStorage(): Storage {
  if(typeof window === "undefined"){
    return memoryStorage
  }

  return storage
}
