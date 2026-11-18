# SONORA

Enciclopédia musical colaborativa construída com Expo e React Native.

## Objetivo

O SONORA pretende reunir artigos sobre músicas, artistas, álbuns e gêneros musicais. A comunidade poderá ampliar os artigos com informações verificáveis, fontes, contexto histórico, análises e correções.

## Tecnologias atuais

- Expo
- React Native
- JavaScript
- Gluestack UI
- NativeWind

## Executar localmente

```bash
npm install
npx expo start
```

Para abrir no navegador:

```bash
npx expo start --web
```

## Estado desta versão

A interface inicial apresenta:
- página inicial com busca local por músicas, artistas e álbuns;
- área de exploração por gêneros;
- página de artigo musical;
- formulário demonstrativo de contribuição.

Os dados de músicas são exemplos locais em `data/songs.js`. A busca funciona apenas sobre esses dados. O formulário de contribuição ainda não envia nem persiste informações.

## Próximas etapas

1. Definir o modelo de dados para músicas, artistas, álbuns, fontes e revisões.
2. Configurar Supabase e variáveis de ambiente.
3. Implementar cadastro, login e perfis.
4. Salvar contribuições e manter histórico de versões.
5. Criar regras de moderação e segurança com Row Level Security.

## Direitos autorais

Não armazenar ou publicar letras completas protegidas sem autorização. Priorizar informações factuais, análises próprias, resumos e referências externas.
