import { setDoc, getDoc, doc } from 'firebase/firestore';
import { db } from '@/FirebaseSettings';
import Palindrome from '@/model/Palidrome/palindrome';

export const savePalindromes = async (userId: string, palindromes: Palindrome[]): Promise<void> => {
  const docRef = doc(db, 'palindromes', userId);
  const palindromesData = palindromes.map(({ word, isPalindrome }) => ({ word, isPalindrome }));
  await setDoc(docRef, { palindromes: palindromesData });
};

export const getAllPalindromes = async (userId: string | undefined): Promise<Palindrome[]> => {
  if (!userId) {
    return [];
  }
  const palindromeRef = doc(db, 'palindromes', userId);
  const docSnap = await getDoc(palindromeRef);
  if (docSnap.exists()) {
    return docSnap.data().palindromes;
  }
  return [];
};
