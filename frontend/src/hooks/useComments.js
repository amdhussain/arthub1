import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchComments, addComment, fetchMyComments } from '@/api/comment';

export function useComments(artworkId) {
  return useQuery({
    queryKey: ['comments', artworkId],
    queryFn: () => fetchComments(artworkId),
    enabled: !!artworkId,
  });
}

export function useAddComment(artworkId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text) => addComment({ artworkId, text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', artworkId] });
      queryClient.invalidateQueries({ queryKey: ['myComments'] });
    },
  });
}

export function useMyComments() {
  return useQuery({
    queryKey: ['myComments'],
    queryFn: fetchMyComments,
  });
}
