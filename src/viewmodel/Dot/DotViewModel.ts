import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/FirebaseSettings';
import Dot from '@/model/Dot/dot';

export const getDots = async (userId: string | undefined): Promise<Dot[]> => {
  if (!userId) {
    return [];
  }
  const docRef = doc(db, 'dots', userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().dots;
  }
  return [];
};

export const saveDots = async (userId: string, dots: Dot[]): Promise<void> => {
  const docRef = doc(db, 'dots', userId);
  await setDoc(docRef, { dots });
};
