import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, StatusBar, Alert } from 'react-native';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

import Home from './pages/Home';
import Explore from './pages/Exemplo';
import SongDetail from './pages/Final';
import Contribute from './pages/Contribute';
import Login from './pages/Login';
import { songs } from './data/songs';
import { searchTracks } from './services/musicApi';
import { signIn, signUp, createContribution } from './services/supabase';
import { styles } from './styles';

export default function App() {
  const [page, setPage] = useState('home');
  const [query, setQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState(songs[0]);
  const [draftMessage, setDraftMessage] = useState('');
  const [draftSource, setDraftSource] = useState('');
  const [remoteSongs, setRemoteSongs] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [authUser, setAuthUser] = useState(null);
  const [authToken, setAuthToken] = useState('');
  const [authBusy, setAuthBusy] = useState(false);
  const [contributionBusy, setContributionBusy] = useState(false);

  const localMatches = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
    if (!normalizedQuery) return songs;
    return songs.filter((song) =>
      [song.title, song.artist, song.album, song.genre]
        .join(' ')
        .toLocaleLowerCase('pt-BR')
        .includes(normalizedQuery)
    );
  }, [query]);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) {
      setRemoteSongs([]);
      setSearchError('');
      setSearching(false);
      return;
    }
    let active = true;
    setSearching(true);
    setSearchError('');
    const timeout = setTimeout(async () => {
      try {
        const results = await searchTracks(term);
        if (active) setRemoteSongs(results);
      } catch (error) {
        if (active) {
          setRemoteSongs([]);
          setSearchError(error.message || 'Busca externa indisponível. Exibindo resultados locais.');
        }
      } finally {
        if (active) setSearching(false);
      }
    }, 350);
    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [query]);

  const displayedSongs = query.trim().length >= 2
    ? (remoteSongs.length ? remoteSongs : localMatches)
    : localMatches;

  function openSong(song) {
    setSelectedSong(song);
    setPage('song');
  }

  function openContribution(song = selectedSong) {
    setSelectedSong(song);
    if (!authUser || !authToken) {
      setPage('login');
      return;
    }
    setPage('contribute');
  }

  async function handleAuth({ email, password, mode }) {
    setAuthBusy(true);
    try {
      const result = mode === 'signup' ? await signUp(email, password) : await signIn(email, password);
      if (result.access_token && result.user) {
        setAuthToken(result.access_token);
        setAuthUser(result.user);
        setPage('home');
        Alert.alert('SONORA', mode === 'signup' ? 'Conta criada e sessão iniciada.' : 'Login realizado.');
      } else if (mode === 'signup') {
        Alert.alert('Confira seu e-mail', 'O Supabase pode exigir confirmação por e-mail antes do primeiro login.');
      } else {
        throw new Error('A resposta de autenticação não trouxe uma sessão. Verifique a configuração de autenticação do Supabase.');
      }
    } catch (error) {
      Alert.alert('Não foi possível entrar', error.message || 'Confira a configuração e tente novamente.');
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleContribution({ section, source }) {
    if (!authUser || !authToken) {
      setPage('login');
      return;
    }
    setContributionBusy(true);
    try {
      await createContribution({
        contribution: draftMessage,
        source,
        section,
        song: selectedSong,
        accessToken: authToken,
        userId: authUser.id
      });
      setDraftMessage('');
      setDraftSource('');
      setPage('song');
      Alert.alert('Contribuição enviada', 'Sua contribuição foi registrada para revisão.');
    } catch (error) {
      Alert.alert('Não foi possível enviar', error.message || 'Tente novamente.');
    } finally {
      setContributionBusy(false);
    }
  }

  function logout() {
    setAuthUser(null);
    setAuthToken('');
    setPage('home');
  }

  return (
    <GluestackUIProvider mode="light">
      <StatusBar barStyle="light-content" backgroundColor="#08090B" />
      <View style={styles.app}>
        <View style={styles.content}>
          {page === 'home' && (
            <Home query={query} setQuery={setQuery} songs={displayedSongs} onOpenSong={openSong} onExplore={() => setPage('explore')} onLogin={() => setPage('login')} searching={searching} searchError={searchError} user={authUser} onLogout={logout} />
          )}
          {page === 'explore' && (
            <Explore songs={songs} onOpenSong={openSong} onSearch={(term) => { setQuery(term); setPage('home'); }} />
          )}
          {page === 'song' && (
            <SongDetail song={selectedSong} onBack={() => setPage('home')} onContribute={() => openContribution(selectedSong)} />
          )}
          {page === 'contribute' && (
            <Contribute song={selectedSong} value={draftMessage} onChange={setDraftMessage} source={draftSource} onSourceChange={setDraftSource} busy={contributionBusy} onBack={() => setPage('song')} onSubmit={handleContribution} />
          )}
          {page === 'login' && <Login onBack={() => setPage('home')} onSubmit={handleAuth} busy={authBusy} />}
        </View>

        {page !== 'login' && (
          <View style={styles.tabBar}>
            {[
              { id: 'home', icon: '⌂', label: 'INÍCIO' },
              { id: 'explore', icon: '◈', label: 'EXPLORAR' },
            ].map((item) => {
              const active = page === item.id || (page === 'song' && item.id === 'home');
              return (
                <Pressable key={item.id} onPress={() => setPage(item.id)} style={styles.tabItem} accessibilityRole="button" accessibilityState={{ selected: active }}>
                  <Text style={[styles.tabIcon, active && styles.tabActive]}>{item.icon}</Text>
                  <Text style={[styles.tabLabel, active && styles.tabActive]}>{item.label}</Text>
                  {active && <View style={styles.tabIndicator} />}
                </Pressable>
              );
            })}
            <Pressable onPress={() => openContribution(selectedSong)} style={styles.tabItem} accessibilityRole="button">
              <Text style={[styles.tabIcon, page === 'contribute' && styles.tabActive]}>＋</Text>
              <Text style={[styles.tabLabel, page === 'contribute' && styles.tabActive]}>CONTRIBUIR</Text>
              {page === 'contribute' && <View style={styles.tabIndicator} />}
            </Pressable>
          </View>
        )}
      </View>
    </GluestackUIProvider>
  );
}
