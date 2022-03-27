import { db } from "firebase-client";
import { FirebaseError } from "firebase/app";
import {
  collection,
  CollectionReference,
  onSnapshot,
  query,
  where,
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
  const q = query(ordersCollectin, where("status", "!=", "delivered"));
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
