import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMyCollection, addToCollection, removeFromCollection } from '@/api/collection';

export function useMyCollection(enabled = true) {
  return useQuery({
    queryKey: ['myCollection'],
    queryFn: fetchMyCollection,
    enabled,
  });
}

export function useAddToCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => addToCollection(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myCollection'] });
    },
  });
}

export function useRemoveFromCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (artworkId) => removeFromCollection(artworkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myCollection'] });
    },
  });
}
