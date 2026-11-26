const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

function configError() {
  throw new Error('Configure EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY no arquivo .env para ativar contas e contribuições.');
}

async function authRequest(path, email, password) {
  if (!isSupabaseConfigured) configError();
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY },
    body: JSON.stringify({ email: email.trim(), password })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.msg || data.message || data.error_description || 'Não foi possível autenticar. Verifique os dados e tente novamente.');
  return data;
}

export function signIn(email, password) {
  return authRequest('token?grant_type=password', email, password);
}

export function signUp(email, password) {
  return authRequest('signup', email, password);
}

export async function createContribution({ contribution, source, section, song, accessToken, userId }) {
  if (!isSupabaseConfigured) configError();
  const response = await fetch(`${SUPABASE_URL}/rest/v1/contributions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({
      user_id: userId,
      song_title: song?.title || 'Artigo geral',
      song_artist: song?.artist || null,
      section,
      content: contribution.trim(),
      source_url: source.trim() || null
    })
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || data.details || 'Não foi possível salvar a contribuição.');
  }
}
