import app from "./app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const db = getFirestore(app);
export const storage = getStorage(
  app,
  "gs://restaurant-app-rncourse.appspot.com"
);
