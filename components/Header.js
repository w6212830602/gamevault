'use client';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Link from 'next/link'

export default function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, login, logout } = useAuth();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>🎮 GameVault</div>

      <input
        type="text"
        placeholder="Search games..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />

      {user && (
  <Link href="/favorites" style={styles.favoritesLink}>
    ❤️ My Favorites
  </Link>
)}

      {user ? (
        <div style={styles.userSection}>
          <span style={styles.userName}>Hi, {user.displayName}</span>
          <button onClick={logout} style={styles.button}>Sign Out</button>
        </div>
      ) : (
        <button onClick={login} style={styles.button}>Sign In with Google</button>
      )}
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 24px',
    backgroundColor: '#1f2937',
    color: 'white',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  logo: { fontSize: '1.5rem', fontWeight: 'bold' },
  searchInput: {
    flex: 1,
    minWidth: '200px',
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  userName: {
    fontWeight: 'bold',
  },

  favoritesLink: {
  padding: '8px 16px',
  backgroundColor: '#10b981', 
  color: 'white',
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  transition: 'all 0.2s',
  marginLeft: '8px',
},

favoritesLinkHover: {
  backgroundColor: '#059669',
},

};
