import api from './axios';

export async function fetchFeaturedArtworks() {
  const { data } = await api.get('/artworks/featured');
  return data.artworks || data;
}

export async function fetchArtworks(params) {
  const { data } = await api.get('/artworks', { params });
  return data;
}

export async function fetchArtworkById(id) {
  const { data } = await api.get(`/artworks/${id}`);
  return data.artwork || data;
}

export async function updateArtworkAfterPurchase(id, payload) {
  const { data } = await api.patch(`/artworks/${id}`, payload);
  return data.artwork || data;
}

export async function deleteArtwork(id) {
  const { data } = await api.delete(`/artworks/${id}`);
  return data;
}
