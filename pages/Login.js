import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { styles } from '../styles';

export default function Login({ onBack }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isSignup = mode === 'signup';

  return (
    <ScrollView contentContainerStyle={styles.loginPage} keyboardShouldPersistTaps="handled">
      <Pressable onPress={onBack}><Text style={styles.loginBack}>← VOLTAR</Text></Pressable>
      <Text style={styles.loginLogo}>SONORA</Text>
      <Text style={styles.loginEyebrow}>UM ARQUIVO FEITO POR TODOS</Text>
      <Text style={styles.loginTitle}>{isSignup ? 'Faça parte da história.' : 'Entre no universo.'}</Text>
      <Text style={styles.loginSubtitle}>Acesse sua conta para contribuir com histórias, fontes e descobertas musicais.</Text>

      <Text style={styles.loginFieldLabel}>E-MAIL</Text>
      <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="seu@email.com" placeholderTextColor="#77777D" style={styles.loginInput} />
      <Text style={styles.loginFieldLabel}>SENHA</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Mínimo de 8 caracteres" placeholderTextColor="#77777D" style={styles.loginInput} />

      <Pressable disabled={!email.trim() || password.length < 8} style={[styles.primaryButton, (!email.trim() || password.length < 8) && styles.disabledButton]}>
        <Text style={styles.primaryButtonText}>{isSignup ? 'CRIAR CONTA ↗' : 'ENTRAR ↗'}</Text>
      </Pressable>
      <Pressable onPress={() => setMode(isSignup ? 'login' : 'signup')}>
        <Text style={styles.loginSwitch}>{isSignup ? 'Já tem uma conta? Entrar' : 'Ainda não tem conta? Criar conta'}</Text>
      </Pressable>
      <Text style={styles.loginLegal}>A tela é um protótipo visual. A autenticação será conectada ao Supabase na etapa de backend.</Text>
    </ScrollView>
  );
}
