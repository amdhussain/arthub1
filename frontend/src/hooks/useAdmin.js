import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAdminStats,
  fetchAdminUsers,
  updateUserRole,
  fetchAdminArtworks,
  deleteArtwork,
} from '@/api/admin';

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: fetchAdminStats,
  });
}

export function useAdminUsers(params) {
  return useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: () => fetchAdminUsers(params),
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }) => updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
}

export function useAdminArtworks(params) {
  return useQuery({
    queryKey: ['admin', 'artworks', params],
    queryFn: () => fetchAdminArtworks(params),
  });
}

export function useDeleteArtwork() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (artworkId) => deleteArtwork(artworkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'artworks'] });
    },
  });
}
