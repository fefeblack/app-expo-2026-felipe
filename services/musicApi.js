const ITUNES_ENDPOINT = 'https://itunes.apple.com/search';

function normalizeTrack(track) {
  return {
    id: String(track.trackId),
    title: track.trackName || 'Faixa sem título',
    artist: track.artistName || 'Artista desconhecido',
    album: track.collectionName || 'Álbum não informado',
    year: track.releaseDate ? track.releaseDate.slice(0, 4) : '—',
    genre: track.primaryGenreName || 'Música',
    color: '#1B2024',
    coverUrl: track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '600x600bb') : null,
    previewUrl: track.previewUrl || null,
    externalUrl: track.trackViewUrl || null,
    description: 'Dados básicos fornecidos pelo catálogo do iTunes. O artigo editorial poderá ser ampliado com contexto, referências e contribuições verificadas.'
  };
}

export async function searchTracks(term, limit = 20) {
  const q = term.trim();
  if (q.length < 2) return [];
  const url = `${ITUNES_ENDPOINT}?term=${encodeURIComponent(q)}&media=music&entity=song&limit=${limit}&country=BR`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Não foi possível consultar o catálogo musical agora.');
  const data = await response.json();
  return (data.results || []).map(normalizeTrack);
}
