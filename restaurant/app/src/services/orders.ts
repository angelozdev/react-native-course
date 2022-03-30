import { db } from '@firebase-client'
import { FirebaseError } from 'firebase/app'
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
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

type GetByIdRT = {
  onNext(order: Order | null): void
  onError?(error: FirebaseError): void
}

const orderCollection = collection(db, 'orders') as CollectionReference<Order>

export async function getAll() {
  try {
    const ordersRef = await getDocs(orderCollection)
    const orders = ordersRef.docs.map((document) => ({
      ...document.data(),
      id: document.id,
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
      const orders = snapshot.docs.map((document) => {
        const data = document.data()
        return {
          ...data,
          id: document.id,
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

export function getByIdRT(id: Order['id'], { onNext, onError }: GetByIdRT) {
  const orderRef = doc(orderCollection, id)
  const unsubscribe = onSnapshot(
    orderRef,
    (snapshot) => {
      const order = { ...snapshot.data(), id: snapshot.id } as Order
      if (!order) return onNext(null)
      onNext(order)
    },
    (error) => {
      console.error(error)
      onError?.(error)
    },
  )

  return unsubscribe
}
