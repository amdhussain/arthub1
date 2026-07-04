import ArtworkDetails from '@/components/artwork/ArtworkDetails';

export default async function ArtworkPage({ params }) {
  const { id } = await params;
  return <ArtworkDetails id={id} />;
}
