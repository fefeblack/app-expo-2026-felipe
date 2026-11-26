import React, { useState } from 'react';
import { Text, Pressable, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { styles } from '../styles';

const sections = ['História da música', 'Significado e interpretação', 'Gravação e produção', 'Curiosidades', 'Fontes e referências', 'Correção de informação'];

export default function Contribute({ song, value, onChange, source, onSourceChange, onBack, onSubmit, busy }) {
  const [section, setSection] = useState(sections[0]);

  function submitDraft() {
    if (!value.trim()) {
      Alert.alert('Escreva sua contribuição', 'Adicione o conteúdo antes de enviar.');
      return;
    }
    onSubmit({ section, source });
  }

  return (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <Pressable onPress={onBack} style={styles.backButton}><Text style={styles.backButtonText}>←  Voltar ao artigo</Text></Pressable>
      <Text style={styles.eyebrow}>CONSTRUÇÃO COLABORATIVA</Text>
      <Text style={styles.pageTitle}>Compartilhe o que sabe.</Text>
      <Text style={styles.pageIntro}>Sua contribuição será enviada para revisão antes de aparecer publicamente.</Text>
      <Text style={styles.fieldLabel}>ARTIGO SELECIONADO</Text>
      <Text style={styles.contributionTargetTitle}>{song?.title || 'Novo artigo'}</Text>
      <Text style={styles.contributionTargetArtist}>{song?.artist || ''}</Text>
      <Text style={styles.fieldLabel}>Em qual parte deseja contribuir?</Text>
      <View style={styles.sectionChoices}>
        {sections.map((item) => (
          <Pressable key={item} onPress={() => setSection(item)} style={[styles.sectionChoice, section === item && styles.sectionChoiceActive]}>
            <Text style={[styles.sectionChoiceText, section === item && styles.sectionChoiceTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.fieldLabel}>Sua contribuição</Text>
      <TextInput value={value} onChangeText={onChange} multiline textAlignVertical="top" placeholder="Escreva informações claras e verificáveis. Explique de onde veio o conhecimento..." placeholderTextColor="#92949A" style={styles.contributionInput} />
      <Text style={styles.fieldLabel}>Fonte ou referência</Text>
      <TextInput value={source} onChangeText={onSourceChange} placeholder="Link da fonte (opcional)" placeholderTextColor="#92949A" style={styles.sourceInput} autoCapitalize="none" keyboardType="url" />
      <View style={styles.guidelineBox}>
        <Text style={styles.guidelineTitle}>Boas práticas do SONORA</Text>
        <Text style={styles.guidelineText}>• Prefira fatos verificáveis e linguagem respeitosa.</Text>
        <Text style={styles.guidelineText}>• Inclua fontes sempre que possível.</Text>
        <Text style={styles.guidelineText}>• Não publique letras completas protegidas por direitos autorais.</Text>
      </View>
      <Pressable onPress={submitDraft} disabled={busy || !value.trim()} style={[styles.primaryButton, (busy || !value.trim()) && styles.disabledButton]}>
        {busy ? <ActivityIndicator color="#071013" /> : <Text style={styles.primaryButtonText}>ENVIAR PARA REVISÃO ↗</Text>}
      </Pressable>
      <Text style={styles.disclaimer}>As contribuições são armazenadas no banco e ficam pendentes até revisão. Consulte a configuração Supabase no README para ativar o serviço.</Text>
    </ScrollView>
  );
}
