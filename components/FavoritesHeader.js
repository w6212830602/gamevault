'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function FavoritesHeader({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <header style={styles.header}>
      <Link href="/" style={styles.logo}>
        🎮 My Favorites
      </Link>
      <input
        type="text"
        placeholder="Search in favorites..."
        value={query}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#1f2937',
    color: 'white',
    flexWrap: 'wrap',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  searchInput: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    minWidth: '240px',
  },
};
