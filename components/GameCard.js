'use client';
import React from 'react';
import useFavorites from '../hooks/useFavorites';

export default function GameCard({ game }) {
  const { isFavorited, toggleFavorite } = useFavorites(game.id);

  return (
    <div style={styles.card}>
      <img src={game.cover} alt={game.title} style={styles.image} />
      <h3 style={styles.title}>{game.title}</h3>
      <p style={styles.platform}>{game.platform}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(game);
        }}
        style={styles.favorite}
      >
        {isFavorited ? '💖 Remove' : '🤍 Favorite'}
      </button>
    </div>
  );
}

const styles = {
  card: {
    width: '180px',
    backgroundColor: '#f3f4f6',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    padding: '12px',
    textAlign: 'center',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '240px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  title: {
    fontSize: '1rem',
    margin: '10px 0 4px',
    fontWeight: 'bold',
  },
  platform: {
    fontSize: '0.9rem',
    color: '#555',
  },
  favorite: {
    marginTop: '10px',
    padding: '6px 12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};
