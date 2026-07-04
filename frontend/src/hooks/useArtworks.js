import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedArtworks, fetchArtworks } from '@/api/artwork';

export function useFeaturedArtworks() {
  return useQuery({
    queryKey: ['artworks', 'featured'],
    queryFn: fetchFeaturedArtworks,
  });
}

export function useArtworks(params) {
  return useQuery({
    queryKey: ['artworks', params],
    queryFn: () => fetchArtworks(params),
    placeholderData: (prev) => prev,
  });
}
