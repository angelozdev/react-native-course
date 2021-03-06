import { db } from "firebase-client";
import { FirebaseError } from "firebase/app";
import {
  collection,
  CollectionReference,
  onSnapshot,
  query,
  updateDoc,
  doc,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { Order } from "./resourses";

// types
type GetAllRTParams = {
  onNext: (orders: Order[]) => void;
  onError?: (error: FirebaseError) => void;
};

// refs
const ordersCollectin = collection(db, "orders") as CollectionReference<Order>;

// services
export function getAllRT({ onNext, onError }: GetAllRTParams) {
  const q = query(ordersCollectin, orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      onNext(orders);
    },
    (error) => {
      console.error(error);
      onError?.(error);
    }
  );

  return unsubscribe;
}

export async function updateById(id: string, data: Partial<Order>) {
  try {
    const orderPath = doc(ordersCollectin, id);
    await updateDoc(orderPath, { ...data, updatedAt: Date.now() });
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function deleteById(id: Order["id"]) {
  try {
    const orderPath = doc(ordersCollectin, id);
    await deleteDoc(orderPath);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
