import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '@/FirebaseSettings';

export async function register(email: string, password: string) {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0) {
      alert('Email already in use');
      return false;
    }

    await createUserWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error: any) {
    return false;
  }
}

export async function login(email: string, password: string) {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length === 0) {
      alert('User not found');
      return false;
    }
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error: any) {
    return false;
  }
}

export async function onAuthChanged(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
