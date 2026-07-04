import { useQuery } from '@tanstack/react-query';
import { fetchTopArtists } from '@/api/artist';

export function useTopArtists() {
  return useQuery({
    queryKey: ['artists', 'top'],
    queryFn: fetchTopArtists,
  });
}
