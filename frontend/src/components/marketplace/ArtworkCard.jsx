'use client';

import Link from 'next/link';
import PropTypes from 'prop-types';
import { useAuth } from '@/hooks/useAuth';
import { useMyCollection, useAddToCollection, useRemoveFromCollection } from '@/hooks/useCollection';

export default function ArtworkCard({ artwork }) {
  const { user } = useAuth();
  const { data: collectionItems } = useMyCollection(!!user);
  const addToCollection = useAddToCollection();
  const removeFromCollection = useRemoveFromCollection();

  const artworkId = artwork._id || artwork.id;
  const isInCollection = collectionItems?.some(
    (item) => String(item.artworkId) === String(artworkId)
  );

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    try {
      if (isInCollection) {
        await removeFromCollection.mutateAsync(artworkId);
      } else {
        await addToCollection.mutateAsync({
          artworkId,
          artwork: {
            title: artwork.title,
            artist: artwork.artist?.name || artwork.artistName || artwork.artist,
            price: artwork.price,
            imageUrl: artwork.imageUrl || artwork.image || artwork.images?.[0]?.url,
            category: artwork.category,
          },
        });
      }
    } catch {
      // mutation errors handled silently to not disrupt browsing
    }
  };

  const imageUrl =
    artwork.images?.[0]?.url ||
    artwork.image ||
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=500&fit=crop';

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-stone-100 flex flex-col relative">
      <Link
        href={`/artwork/${artwork._id || artwork.id}`}
        className="block"
      >
        <figure className="relative aspect-[4/5] overflow-hidden bg-stone-100">
          <img
            src={imageUrl}
            alt={artwork.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            {artwork.medium && (
              <span className="text-xs bg-white/90 text-stone-700 px-2 py-0.5 rounded-full font-medium">
                {artwork.medium}
              </span>
            )}
            {artwork.isOnSale && (
              <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full font-medium">Sale</span>
            )}
          </div>
        </figure>
      </Link>

      {user && (
        <button
          type="button"
          onClick={handleToggle}
          disabled={addToCollection.isPending || removeFromCollection.isPending}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm transition-all duration-200 disabled:opacity-50"
          aria-label={isInCollection ? 'Remove from Collection' : 'Add to Collection'}
        >
          <svg
            className="w-5 h-5"
            fill={isInCollection ? '#ef4444' : 'none'}
            viewBox="0 0 24 24"
            stroke={isInCollection ? '#ef4444' : '#64748b'}
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      )}

      <div className="p-4 space-y-1.5 flex-1 flex flex-col">
        <Link href={`/artwork/${artwork._id || artwork.id}`}>
          <h3 className="text-slate-900 font-bold text-sm truncate hover:text-emerald-700 transition-colors">{artwork.title}</h3>
        </Link>
        <p className="text-slate-500 text-xs truncate">
          {artwork.artist?.name || artwork.artistName || 'Unknown Artist'}
        </p>
        <div className="flex items-center justify-between pt-1">
          <p className="font-bold text-emerald-700 text-sm">
            {artwork.price != null
              ? `$${Number(artwork.price).toLocaleString()}`
              : 'Price on request'}
          </p>
          {artwork.rating != null && (
            <div className="flex items-center gap-1 text-xs text-stone-400">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {artwork.rating}
            </div>
          )}
        </div>
        <div className="mt-2 pt-2 border-t border-stone-100 flex gap-2">
          <Link
            href={`/artwork/${artwork._id || artwork.id}`}
            className="flex-1 text-center text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 py-2 rounded-lg transition-colors"
          >
            View Details
          </Link>
          {user && (
            <button
              type="button"
              onClick={handleToggle}
              disabled={addToCollection.isPending || removeFromCollection.isPending}
              className={`flex-1 text-center text-xs font-medium py-2 rounded-lg transition-colors disabled:opacity-50 ${
                isInCollection
                  ? 'text-red-600 bg-red-50 hover:bg-red-100'
                  : 'text-slate-600 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              {addToCollection.isPending || removeFromCollection.isPending
                ? '...'
                : isInCollection
                  ? 'Remove'
                  : 'Save'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

ArtworkCard.propTypes = {
  artwork: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    imageUrl: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
    medium: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    isOnSale: PropTypes.bool,
    category: PropTypes.string,
    artist: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ]),
    artistName: PropTypes.string,
  }).isRequired,
};
