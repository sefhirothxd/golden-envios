import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyBRdxQReKAcn1qY5J9Wly1zfHImh1x8kag',
  authDomain: 'golde-envios.firebaseapp.com',
  projectId: 'golde-envios',
  storageBucket: 'golde-envios.appspot.com',
  messagingSenderId: '693136335281',
  appId: '1:693136335281:web:3f6ab7708693a482245d90',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
