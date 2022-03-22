import { db, storage } from "firebase-client";
import {
  collection,
  CollectionReference,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Dish } from "./resourses";

const dishesCollection = collection(db, "dishes") as CollectionReference<Dish>;

// *************************************************
export async function addOne(dish: Omit<Dish, "id">) {
  try {
    const newDish = await addDoc(dishesCollection, dish);
    return newDish;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function getAll(): Promise<Dish[]> {
  try {
    const querySnapshot = await getDocs(dishesCollection);
    const dishes = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return dishes;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export function uploadImage(
  image: File,
  {
    onError,
    onSuccess,
    onProgress,
  }: {
    onError?: (error: Error) => void;
    onSuccess?: (url: string) => void;
    onProgress?: (progress: number) => void;
  } = {}
) {
  if (!image) return onSuccess(null);

  const uploadTask = uploadBytesResumable(
    ref(storage, "dishes/" + image.name),
    image
  );

  const unsubscribe = uploadTask.on(
    "state_changed",
    (snapshot) => {
      onProgress?.((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    },
    (error) => {
      console.error(error);
      onError?.(error);
    },
    async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      onSuccess?.(url);
    }
  );

  return unsubscribe;
}
