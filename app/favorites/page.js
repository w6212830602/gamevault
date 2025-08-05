'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import useAuth from '@/hooks/useAuth';
import GameCard from '@/components/GameCard';
import ChartComponent from '@/components/ChartComponent';
import FavoritesHeader from '@/components/FavoritesHeader';

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (!user) return;

    const colRef = collection(db, 'users', user.uid, 'favorites');

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setFavorites(data);
      setFiltered(data); // 預設顯示全部
    });

    return () => unsubscribe();
  }, [user]);

  const handleSearch = (query) => {
    const filteredResults = favorites.filter((game) =>
      game.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(filteredResults);
  };

  if (!user) return <p style={styles.message}>Please sign in to view your favorites.</p>;
  if (favorites.length === 0) return <p style={styles.message}>You have no favorite games yet.</p>;

  return (
    <>
      <FavoritesHeader onSearch={handleSearch} />
      <ChartComponent games={filtered} />
      <div style={styles.grid}>
        {filtered.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </>
  );
}

const styles = {
  message: {
    padding: '40px',
    textAlign: 'center',
    fontSize: '1.2rem',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
    justifyContent: 'center',
  },
};
