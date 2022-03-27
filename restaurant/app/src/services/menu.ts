import {
  collection,
  CollectionReference,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { db } from '@firebase-client'

// types
import type { FirebaseError } from 'firebase/app'
type GetDishesOptions = {
  onSuccess: (dishes: Dish[]) => void
  onError?: (error: FirebaseError) => void
  onFinally?: () => void
}

const dishesCollection = collection(db, 'dishes') as CollectionReference<Dish>

export async function getDishes() {
  try {
    const querySnapshot = await getDocs(dishesCollection)
    const dishes = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))

    return dishes
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

export function getDishesRT({
  onSuccess,
  onError,
  onFinally,
}: GetDishesOptions) {
  const q = query(dishesCollection, where('available', '==', true))
  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const dishes = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))

      onSuccess(dishes)
      onFinally?.()
    },
    (error) => {
      console.error(error)
      onError?.(error)
      onFinally?.()
    },
  )

  return unsubscribe
}
