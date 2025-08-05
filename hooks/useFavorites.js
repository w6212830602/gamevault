'use client';
import { useEffect, useState } from 'react';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import useAuth from './useAuth';

export default function useFavorites(gameId) {
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!user || !gameId) return;
    const checkFavorite = async () => {
      const docRef = doc(db, 'users', user.uid, 'favorites', gameId.toString());
      const docSnap = await getDoc(docRef);
      setIsFavorited(docSnap.exists());
    };
    checkFavorite();
  }, [user, gameId]);

  const toggleFavorite = async (gameData) => {
    if (!user) return alert('Please sign in to favorite games.');

    const docRef = doc(db, 'users', user.uid, 'favorites', gameId.toString());

    if (isFavorited) {
      await deleteDoc(docRef);
      setIsFavorited(false);
    } else {
      await setDoc(docRef, gameData); 
      setIsFavorited(true);
    }
  };

  return { isFavorited, toggleFavorite };
}
