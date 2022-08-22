import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyA00QodFica67QstRZfscR3p7SrMVhk9l4',
  authDomain: 'golden-fast-1f155.firebaseapp.com',
  projectId: 'golden-fast-1f155',
  storageBucket: 'golden-fast-1f155.appspot.com',
  messagingSenderId: '613746944481',
  appId: '1:613746944481:web:f2c4dc95e04f556e5e8aa0',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
