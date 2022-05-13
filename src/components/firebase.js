import { initializeApp } from "firebase/app";
import {getFireStore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAvNPGuHuOMONiq5bjCkUkKUj_YXGgXYlw",
  authDomain: "crud-sample-49d6a.firebaseapp.com",
  projectId: "crud-sample-49d6a",
  storageBucket: "crud-sample-49d6a.appspot.com",
  messagingSenderId: "747976485853",
  appId: "1:747976485853:web:3d7eda2d5faa29ec7ce434"
};

const app = initializeApp(firebaseConfig);
export const db = getFireStore(app);
