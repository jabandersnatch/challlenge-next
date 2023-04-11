import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDisp-JT9cBOVe6TeYsnIeFwVS4JXx-zDA',
  authDomain: 'technical-test-4196c.firebaseapp.com',
  projectId: 'technical-test-4196c',
  storageBucket: 'technical-test-4196c.appspot.com',
  messagingSenderId: '328035071159',
  appId: '1:328035071159:web:721020616348479d378932',
  measurementId: 'G-ZQ7PM41HQS',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
