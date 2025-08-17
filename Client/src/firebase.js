import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4q5T-RnNZGAMAQkQJ-x2nDmTb3jdjyxI",
  authDomain: "video-1d7d7.firebaseapp.com",
  projectId: "video-1d7d7",
  storageBucket: "video-1d7d7.appspot.com",
  messagingSenderId: "594991196412",
  appId: "1:594991196412:web:8a7903102b636015630f79"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;
