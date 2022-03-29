import { db } from '@firebase-client'
import { FirebaseError } from 'firebase/app'
import {
  addDoc,
  collection,
  CollectionReference,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'

// types
type GetAllRTOptions = {
  onNext(orders: Order[]): void
  onError?(error: FirebaseError): void
}

const orderCollection = collection(db, 'orders') as CollectionReference<Order>

export async function getAll() {
  try {
    const ordersRef = await getDocs(orderCollection)
    const orders = ordersRef.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))

    return orders
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

export function getAllRT({ onNext, onError }: GetAllRTOptions) {
  const q = query(orderCollection, orderBy('createdAt'))
  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          ...data,
          id: doc.id,
        }
      })

      onNext(orders)
    },
    (error) => {
      console.error(error)
      onError?.(error)
    },
  )

  return unsubscribe
}

export async function addOrder(cart: CartState) {
  try {
    const order: Omit<Order, 'id'> = {
      items: cart.items,
      createdAt: Date.now(),
      status: 'pending',
      total: cart.total,
      count: cart.count,
      updatedAt: Date.now(),
    }
    const orderRef = await addDoc(orderCollection, order)
    return orderRef.id
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
