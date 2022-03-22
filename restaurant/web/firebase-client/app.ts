import { EnvironmentVariables } from "@constants";
import { initializeApp, getApps, getApp } from "firebase/app";
const { firebase } = EnvironmentVariables;

const firebaseConfig = JSON.parse(firebase.config);

if (!firebaseConfig) console.error("Firebase config is not defined");

const app = initializeApp(firebaseConfig);

export default app;
