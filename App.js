import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StatusBar } from 'react-native';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

import Home from './pages/Home';
import Explore from './pages/Exemplo';
import SongDetail from './pages/Final';
import Contribute from './pages/Contribute';
import { songs } from './data/songs';
import { styles } from './styles';

export default function App() {
  const [page, setPage] = useState('home');
  const [query, setQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState(songs[0]);
  const [draftMessage, setDraftMessage] = useState('');

  const filteredSongs = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
    if (!normalizedQuery) return songs;
    return songs.filter((song) =>
      [song.title, song.artist, song.album, song.genre]
        .join(' ')
        .toLocaleLowerCase('pt-BR')
        .includes(normalizedQuery)
    );
  }, [query]);

  function openSong(song) {
    setSelectedSong(song);
    setPage('song');
  }

  function openContribution(song = selectedSong) {
    setSelectedSong(song);
    setPage('contribute');
  }

  return (
    <GluestackUIProvider mode="light">
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7F2" />
      <View style={styles.app}>
        <View style={styles.content}>
          {page === 'home' && (
            <Home
              query={query}
              setQuery={setQuery}
              songs={filteredSongs}
              onOpenSong={openSong}
              onExplore={() => setPage('explore')}
            />
          )}
          {page === 'explore' && (
            <Explore
              songs={songs}
              onOpenSong={openSong}
              onSearch={(term) => {
                setQuery(term);
                setPage('home');
              }}
            />
          )}
          {page === 'song' && (
            <SongDetail
              song={selectedSong}
              onBack={() => setPage('home')}
              onContribute={() => openContribution(selectedSong)}
            />
          )}
          {page === 'contribute' && (
            <Contribute
              song={selectedSong}
              value={draftMessage}
              onChange={setDraftMessage}
              onBack={() => setPage('song')}
              onSubmit={() => {
                setDraftMessage('');
                setPage('song');
              }}
            />
          )}
        </View>

        <View style={styles.tabBar}>
          {[
            { id: 'home', icon: '⌂', label: 'Início' },
            { id: 'explore', icon: '◈', label: 'Explorar' },
          ].map((item) => {
            const active = page === item.id || (page === 'song' && item.id === 'home');
            return (
              <Pressable
                key={item.id}
                onPress={() => setPage(item.id)}
                style={styles.tabItem}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <Text style={[styles.tabIcon, active && styles.tabActive]}>{item.icon}</Text>
                <Text style={[styles.tabLabel, active && styles.tabActive]}>{item.label}</Text>
                {active && <View style={styles.tabIndicator} />}
              </Pressable>
            );
          })}
          <Pressable
            onPress={() => openContribution(selectedSong)}
            style={styles.tabItem}
            accessibilityRole="button"
          >
            <Text style={[styles.tabIcon, page === 'contribute' && styles.tabActive]}>＋</Text>
            <Text style={[styles.tabLabel, page === 'contribute' && styles.tabActive]}>Contribuir</Text>
            {page === 'contribute' && <View style={styles.tabIndicator} />}
          </Pressable>
        </View>
      </View>
    </GluestackUIProvider>
  );
}
