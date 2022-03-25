import { initializeApp } from 'firebase/app'
import { FIREBASE_CONFIG } from '@env'

const firebaseConfig = JSON.parse(FIREBASE_CONFIG)

const app = initializeApp(firebaseConfig)
export default app
