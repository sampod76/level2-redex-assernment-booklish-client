import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5HgRwVOaZvgthv6SxkihN10v5hx-zjMs",
  authDomain: "level2-redex-assernment.firebaseapp.com",
  projectId: "level2-redex-assernment",
  storageBucket: "level2-redex-assernment.appspot.com",
  messagingSenderId: "657662089088",
  appId: "1:657662089088:web:00884e0e81a19d48c75365",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// measurementId: "G-7Z5ZKNK6MY"
