import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { styles } from '../styles';

const categories = [
  { title: 'Rock', subtitle: 'Guitarras, bandas e movimentos', icon: '♬', color: '#E9D9FF', term: 'rock' },
  { title: 'Pop', subtitle: 'Hits, tendências e cultura pop', icon: '✦', color: '#FFE2D6', term: 'pop' },
  { title: 'Rock brasileiro', subtitle: 'Bandas e canções do Brasil', icon: '♫', color: '#D9EBDD', term: 'rock brasileiro' },
  { title: 'Psicodélico', subtitle: 'Texturas, experimentação e sons', icon: '◉', color: '#DCE8FF', term: 'psychedelic' },
];

export default function Explore({ songs, onOpenSong, onSearch }) {
  return (
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <Text style={styles.eyebrow}>DESCUBRA ALGO NOVO</Text>
      <Text style={styles.pageTitle}>Explore</Text>
      <Text style={styles.pageIntro}>Entre por um gênero, encontre um artista ou siga uma descoberta.</Text>

      <Text style={styles.sectionTitle}>Gêneros musicais</Text>
      <View style={styles.categoryGrid}>
        {categories.map((category) => (
          <Pressable key={category.term} onPress={() => onSearch(category.term)} style={({ pressed }) => [styles.categoryCard, { backgroundColor: category.color }, pressed && styles.pressed]}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Descobertas para começar</Text>
        <Text style={styles.resultCount}>{songs.length} artigos</Text>
      </View>
      {songs.map((song) => (
        <Pressable key={song.id} onPress={() => onOpenSong(song)} style={({ pressed }) => [styles.songCard, pressed && styles.pressed]}>
          <View style={[styles.cover, { backgroundColor: song.color }]}><Text style={styles.coverMark}>♫</Text></View>
          <View style={styles.songInfo}>
            <Text style={styles.songTitle}>{song.title}</Text>
            <Text style={styles.songArtist}>{song.artist}</Text>
            <Text style={styles.songMeta}>{song.year} · {song.genre}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      ))}
      <View style={styles.editorialBox}>
        <Text style={styles.sectionKicker}>PARTICIPE</Text>
        <Text style={styles.editorialTitle}>Sabe algo que ainda não está aqui?</Text>
        <Text style={styles.editorialText}>O conhecimento cresce quando é compartilhado. Abra um artigo e ajude a melhorá-lo.</Text>
      </View>
    </ScrollView>
  );
}
