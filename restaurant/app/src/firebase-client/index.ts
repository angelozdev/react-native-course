import app from './app'
import { initializeFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
})
export const storage = getStorage(app)
