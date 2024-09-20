import { initAppData } from './auth'

export function onAppDataReady(cb: () => void) {
  initAppData().then(cb)
}
