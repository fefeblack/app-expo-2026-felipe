# SONORA

Enciclopédia musical colaborativa construída com Expo e React Native. O projeto está em desenvolvimento para entrega escolar em 30/11/2026.

## O que já existe nesta versão

- Home editorial SONORA e navegação inferior.
- Busca local e busca de catálogo musical externo.
- Resultados com título, artista, álbum, ano, gênero e capa quando disponível.
- Página de artigo musical e áreas de contexto/interpretação.
- Tela de login e cadastro.
- Formulário de contribuição com seção e referência.
- Esquema inicial Supabase com Row Level Security (RLS).
- Componente reservado para HUD personalizado.

## API musical gratuita

A busca usa a **iTunes Search API** (Apple), sem chave de API:
- Serviço: `services/musicApi.js`
- Endpoint: `https://itunes.apple.com/search`
- A busca é feita para catálogo de música no Brasil; pode retornar capa, dados básicos e link/prévia quando disponíveis.
- As prévias e imagens devem respeitar os termos da Apple. Não use o serviço para baixar ou redistribuir áudio.

O aplicativo continua exibindo dados locais de demonstração em `data/songs.js` quando a busca não tem termo ou não encontra resultados.

## Configuração local

1. Instale Node.js LTS e Git.
2. Clone o repositório e entre na pasta:
   ```bash
   git clone https://github.com/fefeblack/app-expo-2026-felipe.git
   cd app-expo-2026-felipe
   git checkout feat/sonora-foundation
   npm install
   ```
3. Inicie o Expo:
   ```bash
   npx expo start
   ```
4. Para web:
   ```bash
   npx expo start --web
   ```

## Ativar login e contribuições com Supabase

1. Crie um projeto gratuito em https://supabase.com.
2. No painel, abra **SQL Editor** e execute o conteúdo de `supabase/schema.sql`.
3. Copie `.env.example` para um arquivo local chamado `.env`.
4. No painel Supabase, copie Project URL e a chave pública **anon/publishable** para:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA
   ```
5. Reinicie o Expo com cache limpo:
   ```bash
   npx expo start -c
   ```

A autenticação REST e o envio de contribuições estão implementados em `services/supabase.js`. O cadastro pode exigir confirmação por e-mail, conforme as configurações de Authentication do projeto Supabase.

**Segurança:** nunca coloque a chave `service_role`/secret no aplicativo. Não envie seu `.env` ao GitHub. A chave pública do cliente só deve ser usada com RLS habilitado e políticas restritas como as do esquema fornecido.

## Personalizar o visual e o HUD

- `styles.js`: paleta, tipografia, espaçamentos e estilos.
- `pages/Home.js`: composição da página inicial e hero.
- `components/SonoraHud.js`: ponto reservado para você adicionar manualmente o HUD animado. A camada cobre a hero; elementos decorativos devem usar `pointerEvents="none"` para não bloquear controles.

## Limitações desta entrega

- O catálogo é fornecido por uma API externa gratuita e pode ter cobertura variável.
- Os artigos de exemplo são conteúdo demonstrativo; precisam ser ampliados e referenciados.
- O envio de contribuições depende de configurar Supabase e executar o SQL.
- O estado de login é mantido em memória nesta versão; ao fechar o app, o usuário pode precisar entrar novamente.
- A fila de revisão está no banco, mas ainda não existe painel administrativo de moderação nem histórico completo de revisões.
- Não publicamos letras completas protegidas por direitos autorais; priorizamos contexto, análise própria e links para fontes autorizadas.

## Direitos autorais

Não armazenar ou publicar letras completas protegidas sem autorização. Priorizar informações factuais, análises próprias, resumos e referências externas.
