import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDl2OA_kRCApNfccQRiamkmNxzN3B35RhM",
  authDomain: "man-friday-10f9f.firebaseapp.com",
  projectId: "man-friday-10f9f",
  storageBucket: "man-friday-10f9f.appspot.com",
  messagingSenderId: "517277406413",
  appId: "1:517277406413:web:9a03853756cef10dcd8584",
  measurementId: "G-RGWR438LM8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
