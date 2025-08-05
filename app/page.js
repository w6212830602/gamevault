'use client';
import { useState } from 'react';
import Header from '../components/Header';
import GameList from '../components/GameList';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <GameList searchQuery={searchQuery} />
    </>
  );
}
