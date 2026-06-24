import { initializeApp } from "firebase/app";
import {
  getFirestore,
  Firestore,
} from "firebase/firestore";
import { firebase_config } from "../../config";

const app = initializeApp(firebase_config);
const db: Firestore = getFirestore(app);

export { db };
