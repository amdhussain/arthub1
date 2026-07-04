import api from './axios';

export async function fetchAdminStats() {
  const { data } = await api.get('/admin/stats');
  return data;
}

export async function fetchAdminUsers(params) {
  const { data } = await api.get('/admin/users', { params });
  return data;
}

export async function updateUserRole(userId, role) {
  const { data } = await api.patch(`/admin/users/${userId}/role`, { role });
  return data.user || data;
}

export async function fetchAdminArtworks(params) {
  const { data } = await api.get('/admin/artworks', { params });
  return data;
}

export async function deleteArtwork(artworkId) {
  const { data } = await api.delete(`/admin/artworks/${artworkId}`);
  return data;
}
