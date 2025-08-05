'use client';
import { useState } from 'react';
import Header from '../components/Header';
import GameList from '../components/GameList';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  return (
    <>
      <Header
        onSearch={setSearchQuery}
        selectedPlatform={selectedPlatform}
        onPlatformChange={setSelectedPlatform}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />
      <GameList
        searchQuery={searchQuery}
        platform={selectedPlatform}
        genre={selectedGenre}
      />
    </>
  );
}
