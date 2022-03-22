import { db, storage } from "firebase-client";
import {
  collection,
  CollectionReference,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

export async function uploadImage(image: File): Promise<string> {
  try {
    const snapshot = await uploadBytes(
      ref(storage, "dishes/" + image.name),
      image
    );

    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
