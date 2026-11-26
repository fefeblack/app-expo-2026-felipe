import React from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Image } from 'react-native';
import { styles } from '../styles';
import SonoraHud from '../components/SonoraHud';

function TrackRow({ song, index, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.trackRow, pressed && styles.pressed]}>
      <Text style={styles.trackIndex}>{String(index + 1).padStart(2, '0')}</Text>
      {song.coverUrl ? <Image source={{ uri: song.coverUrl }} style={styles.trackArtwork} /> : (
        <View style={[styles.trackArtwork, { backgroundColor: song.color }]}><Text style={styles.trackArtworkGlyph}>♫</Text></View>
      )}
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle} numberOfLines={1}>{song.title}</Text>
        <Text style={styles.trackArtist} numberOfLines={1}>{song.artist} · {song.year}</Text>
      </View>
      <Text style={styles.trackArrow}>↗</Text>
    </Pressable>
  );
}

export default function Home({ query, setQuery, songs, onOpenSong, onExplore, onLogin, searching, searchError, user, onLogout }) {
  const featured = songs[0];
  return (
    <ScrollView contentContainerStyle={styles.homePage} showsVerticalScrollIndicator={false}>
      <View style={styles.homeHeader}>
        <Text style={styles.wordmarkSmall}>SONORA</Text>
        <Pressable onPress={user ? onLogout : onLogin} accessibilityRole="button" accessibilityLabel={user ? 'Sair da conta' : 'Entrar na sua conta'} style={styles.accountButton}>
          <Text style={styles.accountButtonText}>{user ? '↘' : '↗'}</Text>
        </Pressable>
      </View>

      <View style={styles.heroStage}>
        <View pointerEvents="none" style={styles.stageGlowA} />
        <View pointerEvents="none" style={styles.stageGlowB} />
        <View pointerEvents="none" style={styles.stageDisc}><View style={styles.stageDiscInner} /></View>
        <Text style={styles.heroWordmark}>SONORA</Text>
        <Text style={styles.stageEdition}>ENCICLOPÉDIA MUSICAL · VOL. 01</Text>
        <SonoraHud />
        <View style={styles.heroBottom}>
          <View style={styles.heroCaption}>
            <Text style={styles.heroCaptionTop}>CADA FAIXA</Text>
            <Text style={styles.heroCaptionBottom}>TEM UM UNIVERSO.</Text>
          </View>
          <Pressable onPress={onExplore} style={styles.heroExplore}><Text style={styles.heroExploreText}>EXPLORAR ↗</Text></Pressable>
        </View>
      </View>

      <View style={styles.introBlock}>
        <Text style={styles.introKicker}>MÚSICA, ALÉM DO PLAY</Text>
        <Text style={styles.introTitle}>Histórias que{ '\n' }merecem ser ouvidas.</Text>
        <Text style={styles.introDescription}>Um arquivo vivo de artistas, discos e canções — construído por quem ama música.</Text>
      </View>

      <View style={styles.searchLine}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput value={query} onChangeText={setQuery} placeholder="Buscar música, artista, álbum..." placeholderTextColor="#77777B" style={styles.searchInput} returnKeyType="search" accessibilityLabel="Buscar músicas, artistas ou álbuns" />
        {query.length > 0 && <Pressable onPress={() => setQuery('')}><Text style={styles.clearSearch}>×</Text></Pressable>}
      </View>
      {searching && <Text style={styles.searchStatus}>CONSULTANDO CATÁLOGO MUSICAL…</Text>}
      {!!searchError && <Text style={styles.searchError}>{searchError}</Text>}

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionKicker}>{query ? 'RESULTADOS' : 'SELEÇÃO SONORA'}</Text>
          <Text style={styles.sectionTitle}>{query ? 'Encontrado no arquivo' : 'Faixas em destaque'}</Text>
        </View>
        <Pressable onPress={onExplore}><Text style={styles.textLink}>VER TUDO ↗</Text></Pressable>
      </View>

      {songs.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>{searching ? 'Procurando no catálogo…' : 'Nada encontrado por aqui.'}</Text>
          <Text style={styles.emptyText}>Tente outro título ou nome de artista.</Text>
        </View>
      ) : songs.map((song, index) => <TrackRow key={song.id} song={song} index={index} onPress={() => onOpenSong(song)} />)}

      {featured && (
        <Pressable onPress={() => onOpenSong(featured)} style={styles.featureEditorial}>
          <Text style={styles.editorialOverline}>NO ARQUIVO · {featured.year}</Text>
          <Text style={styles.editorialHeading}>{featured.title}</Text>
          <Text style={styles.editorialByline}>{featured.artist} / {featured.album}</Text>
          <Text style={styles.editorialAction}>ABRIR HISTÓRIA  ↗</Text>
        </Pressable>
      )}

      <View style={styles.communityFooter}>
        <Text style={styles.communityFooterMark}>S.</Text>
        <Text style={styles.communityFooterText}>O SONORA é escrito por pessoas. Descubra, cite suas fontes e ajude a preservar a cultura musical.</Text>
      </View>
    </ScrollView>
  );
}
