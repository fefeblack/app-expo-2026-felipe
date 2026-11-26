import React, { useState } from 'react';
import { Alert, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from '../styles';

export default function Login({ onBack, onSubmit, busy }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isSignup = mode === 'signup';

  async function submit() {
    if (!email.trim() || password.length < 8) {
      Alert.alert('Confira os dados', 'Informe um e-mail válido e uma senha com pelo menos 8 caracteres.');
      return;
    }
    await onSubmit({ email, password, mode });
  }

  return (
    <ScrollView contentContainerStyle={styles.loginPage} keyboardShouldPersistTaps="handled">
      <Pressable onPress={onBack}><Text style={styles.loginBack}>← VOLTAR</Text></Pressable>
      <Text style={styles.loginLogo}>SONORA</Text>
      <Text style={styles.loginEyebrow}>UM ARQUIVO FEITO POR TODOS</Text>
      <Text style={styles.loginTitle}>{isSignup ? 'Faça parte da história.' : 'Entre no universo.'}</Text>
      <Text style={styles.loginSubtitle}>Acesse sua conta para contribuir com histórias, fontes e descobertas musicais.</Text>
      <Text style={styles.loginFieldLabel}>E-MAIL</Text>
      <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="seu@email.com" placeholderTextColor="#77777D" style={styles.loginInput} />
      <Text style={styles.loginFieldLabel}>SENHA</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" placeholder="Mínimo de 8 caracteres" placeholderTextColor="#77777D" style={styles.loginInput} />
      <Pressable onPress={submit} disabled={busy || !email.trim() || password.length < 8} style={[styles.primaryButton, (busy || !email.trim() || password.length < 8) && styles.disabledButton]}>
        {busy ? <ActivityIndicator color="#071013" /> : <Text style={styles.primaryButtonText}>{isSignup ? 'CRIAR CONTA ↗' : 'ENTRAR ↗'}</Text>}
      </Pressable>
      <Pressable disabled={busy} onPress={() => setMode(isSignup ? 'login' : 'signup')}>
        <Text style={styles.loginSwitch}>{isSignup ? 'Já tem uma conta? Entrar' : 'Ainda não tem conta? Criar conta'}</Text>
      </Pressable>
      <Text style={styles.loginLegal}>Ao criar uma conta, você poderá enviar contribuições para revisão da comunidade. O acesso à leitura continua livre.</Text>
    </ScrollView>
  );
}
