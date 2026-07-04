import { useQuery } from '@tanstack/react-query';
import { fetchArtworkById } from '@/api/artwork';

export function useArtwork(id) {
  return useQuery({
    queryKey: ['artwork', id],
    queryFn: () => fetchArtworkById(id),
    enabled: !!id,
  });
}
