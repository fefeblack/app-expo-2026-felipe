import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { styles } from '../styles';

export default function SongDetail({ song, onBack, onContribute }) {
  if (!song) return null;
  return (
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <Pressable onPress={onBack} style={styles.backButton}><Text style={styles.backButtonText}>←  Voltar à biblioteca</Text></Pressable>
      <View style={[styles.detailArtwork, { backgroundColor: song.color }]}>
        <Text style={styles.detailArtworkNote}>♫</Text>
        <Text style={styles.detailArtworkLabel}>SONORA  /  ARQUIVO MUSICAL</Text>
      </View>
      <Text style={styles.eyebrow}>ARTIGO MUSICAL</Text>
      <Text style={styles.detailTitle}>{song.title}</Text>
      <Text style={styles.detailArtist}>{song.artist}</Text>
      <View style={styles.tagRow}><Text style={styles.tag}>{song.year}</Text><Text style={styles.tag}>{song.genre}</Text><Text style={styles.tag}>{song.album}</Text></View>

      <View style={styles.articleBox}>
        <Text style={styles.articleHeading}>Sobre a música</Text>
        <Text style={styles.articleText}>{song.description}</Text>
      </View>
      <View style={styles.factGrid}>
        <View style={styles.factCard}><Text style={styles.factLabel}>LANÇAMENTO</Text><Text style={styles.factValue}>{song.year}</Text></View>
        <View style={styles.factCard}><Text style={styles.factLabel}>GÊNERO</Text><Text style={styles.factValue}>{song.genre}</Text></View>
      </View>
      <View style={styles.articleBox}>
        <Text style={styles.articleHeading}>Contexto e interpretação</Text>
        <Text style={styles.articleText}>Esta seção poderá reunir análises, histórias de produção, interpretações e informações sobre o contexto cultural da faixa. O conteúdo poderá ser ampliado pela comunidade com fontes confiáveis.</Text>
        <Text style={styles.placeholderLabel}>SEÇÃO EM CONSTRUÇÃO PELA COMUNIDADE</Text>
      </View>
      <View style={styles.contributePanel}>
        <Text style={styles.contributePanelTitle}>Você conhece essa história?</Text>
        <Text style={styles.contributePanelText}>Adicione informações, corrija detalhes ou indique fontes para melhorar este artigo.</Text>
        <Pressable onPress={onContribute} style={styles.primaryButton}><Text style={styles.primaryButtonText}>＋  Contribuir com este artigo</Text></Pressable>
      </View>
      <Text style={styles.disclaimer}>Conteúdo demonstrativo. As informações desta versão inicial são exemplos editoriais e serão enriquecidas e referenciadas nas próximas etapas.</Text>
    </ScrollView>
  );
}
