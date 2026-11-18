import React from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { styles } from '../styles';

function SongCard({ song, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.songCard, pressed && styles.pressed]}>
      <View style={[styles.cover, { backgroundColor: song.color }]}>
        <Text style={styles.coverMark}>♫</Text>
      </View>
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
        <Text style={styles.songArtist} numberOfLines={1}>{song.artist}</Text>
        <Text style={styles.songMeta}>{song.year}  ·  {song.genre}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

export default function Home({ query, setQuery, songs, onOpenSong, onExplore }) {
  return (
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>SONORA<Text style={styles.brandDot}>.</Text></Text>
          <Text style={styles.eyebrow}>ENCICLOPÉDIA MUSICAL COLABORATIVA</Text>
        </View>
        <View style={styles.profileMark}><Text style={styles.profileMarkText}>S</Text></View>
      </View>

      <Text style={styles.heroTitle}>Toda música{ '\n' }tem uma história.</Text>
      <Text style={styles.heroText}>Descubra os bastidores, conheça os artistas e compartilhe o que você sabe.</Text>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Busque músicas, artistas ou álbuns"
          placeholderTextColor="#8B8D91"
          style={styles.searchInput}
          returnKeyType="search"
          accessibilityLabel="Buscar músicas, artistas ou álbuns"
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')}><Text style={styles.clearSearch}>×</Text></Pressable>
        )}
      </View>

      <View style={styles.sectionHeader}>
        <View><Text style={styles.sectionKicker}>PONTO DE PARTIDA</Text><Text style={styles.sectionTitle}>Explore o universo musical</Text></View>
        <Pressable onPress={onExplore}><Text style={styles.textLink}>Ver tudo ↗</Text></Pressable>
      </View>

      <Pressable onPress={onExplore} style={styles.featureCard}>
        <View style={styles.featureOrb}><Text style={styles.featureOrbText}>♫</Text></View>
        <Text style={styles.featureKicker}>CONHECIMENTO EM MOVIMENTO</Text>
        <Text style={styles.featureTitle}>Uma comunidade{ '\n' }que entende de música.</Text>
        <Text style={styles.featureDescription}>Leia, descubra e ajude a construir histórias musicais.</Text>
        <Text style={styles.featureAction}>Começar a explorar  →</Text>
      </Pressable>

      <View style={styles.sectionHeader}>
        <View><Text style={styles.sectionKicker}>BIBLIOTECA SONORA</Text><Text style={styles.sectionTitle}>{query ? 'Resultados da busca' : 'Músicas em destaque'}</Text></View>
        <Text style={styles.resultCount}>{songs.length} {songs.length === 1 ? 'faixa' : 'faixas'}</Text>
      </View>

      {songs.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>⌕</Text>
          <Text style={styles.emptyTitle}>Não encontramos essa música</Text>
          <Text style={styles.emptyText}>Tente buscar pelo nome do artista ou do álbum.</Text>
        </View>
      ) : songs.map((song) => (
        <SongCard key={song.id} song={song} onPress={() => onOpenSong(song)} />
      ))}

      <View style={styles.communityNote}>
        <Text style={styles.communityIcon}>✳</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.communityTitle}>O SONORA é feito por pessoas.</Text>
          <Text style={styles.communityText}>Enriqueça os artigos com informações, referências e novas perspectivas.</Text>
        </View>
      </View>
    </ScrollView>
  );
}
