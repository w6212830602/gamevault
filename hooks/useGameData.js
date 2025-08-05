'use client';
import { useEffect, useState } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export default function useGameData(query = '') {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=12&search=${query}`
        );
        const data = await res.json();

        const simplified = data.results.map((game) => ({
          id: game.id,
          title: game.name,
          platform: game.parent_platforms?.map((p) => p.platform.name).join(', ') || 'Unknown',
          cover: game.background_image,
        }));

        setGames(simplified);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [query]);

  return { games, loading };
}
