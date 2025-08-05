'use client';
import { useEffect, useState } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export default function useGameDetail(gameId) {
  const [gameDetail, setGameDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId) return;

    const fetchGameDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
        const data = await res.json();
        setGameDetail(data);
      } catch (error) {
        console.error('Error fetching game detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetail();
  }, [gameId]);

  return { gameDetail, loading };
}
