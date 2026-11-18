import React, { useState } from 'react';
import { Text, Pressable, ScrollView, TextInput } from 'react-native';
import { styles } from '../styles';

const sections = ['História da música', 'Significado e interpretação', 'Gravação e produção', 'Curiosidades', 'Fontes e referências', 'Correção de informação'];

export default function Contribute({ song, value, onChange, onBack, onSubmit }) {
  const [section, setSection] = useState(sections[0]);
  const [source, setSource] = useState('');

  function submitDraft() {
    if (!value.trim()) return;
    onSubmit();
  }

  return (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <Pressable onPress={onBack} style={styles.backButton}><Text style={styles.backButtonText}>←  Voltar ao artigo</Text></Pressable>
      <Text style={styles.eyebrow}>CONSTRUÇÃO COLABORATIVA</Text>
      <Text style={styles.pageTitle}>Compartilhe o que sabe.</Text>
      <Text style={styles.pageIntro}>Sua contribuição ajuda a registrar e preservar a história da música.</Text>
      <View style={styles.contributionTarget}>
        <Text style={styles.contributionTargetLabel}>ARTIGO SELECIONADO</Text>
        <Text style={styles.contributionTargetTitle}>{song?.title || 'Novo artigo'}</Text>
        <Text style={styles.contributionTargetArtist}>{song?.artist || ''}</Text>
      </View>
      <Text style={styles.fieldLabel}>Em qual parte deseja contribuir?</Text>
      <View style={styles.sectionChoices}>
        {sections.map((item) => (
          <Pressable key={item} onPress={() => setSection(item)} style={[styles.sectionChoice, section === item && styles.sectionChoiceActive]}>
            <Text style={[styles.sectionChoiceText, section === item && styles.sectionChoiceTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.fieldLabel}>Sua contribuição</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        multiline
        textAlignVertical="top"
        placeholder="Escreva informações claras e verificáveis. Explique de onde veio o conhecimento..."
        placeholderTextColor="#92949A"
        style={styles.contributionInput}
      />
      <Text style={styles.fieldLabel}>Fonte ou referência (opcional nesta demonstração)</Text>
      <TextInput value={source} onChangeText={setSource} placeholder="Cole o link ou identifique a fonte" placeholderTextColor="#92949A" style={styles.sourceInput} autoCapitalize="none" />
      <View style={styles.guidelineBox}>
        <Text style={styles.guidelineTitle}>Boas práticas do SONORA</Text>
        <Text style={styles.guidelineText}>• Prefira fatos verificáveis e linguagem respeitosa.</Text>
        <Text style={styles.guidelineText}>• Inclua fontes sempre que possível.</Text>
        <Text style={styles.guidelineText}>• Não publique letras completas protegidas por direitos autorais.</Text>
      </View>
      <Pressable onPress={submitDraft} disabled={!value.trim()} style={[styles.primaryButton, !value.trim() && styles.disabledButton]}>
        <Text style={styles.primaryButtonText}>Enviar contribuição de demonstração</Text>
      </Pressable>
      <Text style={styles.disclaimer}>Nesta etapa, o formulário é apenas uma prévia visual: nada é enviado ou salvo no servidor. O envio real será implementado junto com autenticação, banco de dados e histórico de revisões.</Text>
    </ScrollView>
  );
}
