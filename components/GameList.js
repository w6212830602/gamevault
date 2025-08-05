'use client';
import React from 'react';
import GameCard from './GameCard';
import useGameData from '../hooks/useGameData';
import GameDetail from './GameDetail';
import { useState } from 'react';

export default function GameList({ searchQuery, platform, genre }) {
  const { games, loading } = useGameData(searchQuery, platform, genre);
  const [selectedGameId, setSelectedGameId] = useState(null);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading games...</p>;

  return (
    <>
      <div style={styles.grid}>
        {games.length === 0 ? (
          <p>No results found.</p>
        ) : (
          games.map((game) => (
            <div key={game.id} onClick={() => setSelectedGameId(game.id)}>
              <GameCard game={game} />
            </div>
          ))
        )}
      </div>
      {selectedGameId && (
        <GameDetail gameId={selectedGameId} onClose={() => setSelectedGameId(null)} />
      )}
    </>
  );
}

const styles = {
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
    justifyContent: 'center',
  },
};
