'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useQueryClient } from '@tanstack/react-query';
import { useArtwork } from '@/hooks/useArtwork';
import { useAuth } from '@/hooks/useAuth';
import { deleteArtwork } from '@/api/artwork';
import { useMyCollection, useAddToCollection, useRemoveFromCollection } from '@/hooks/useCollection';
import ArtworkImage from './ArtworkImage';
import ArtworkInfo from './ArtworkInfo';
import BuyNowButton from './BuyNowButton';
import CommentSection from './CommentSection';

export default function ArtworkDetails({ id }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data: artwork, isLoading, isError, error, refetch } = useArtwork(id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const currentUserId = user?.id || user?._id;
  const canDelete = user?.role === 'admin' ||
    (currentUserId && (currentUserId === artwork?.artist?._id || currentUserId === artwork?.artist));

  const { data: collectionItems } = useMyCollection(!!user);
  const addToCollection = useAddToCollection();
  const removeFromCollection = useRemoveFromCollection();
  const artworkId = artwork?._id || artwork?.id;
  const isInCollection = collectionItems?.some(
    (item) => String(item.artworkId) === String(artworkId)
  );

  const [collectionError, setCollectionError] = useState('');

  const handleCollectionToggle = async () => {
    if (!user || !artwork) return;
    setCollectionError('');
    try {
      if (isInCollection) {
        await removeFromCollection.mutateAsync(artworkId);
      } else {
        await addToCollection.mutateAsync({
          artworkId,
          artwork: {
            title: artwork.title,
            artist: artwork.artistName || artwork.artist,
            price: artwork.price,
            imageUrl: artwork.imageUrl || artwork.image || artwork.images?.[0]?.url,
            category: artwork.category,
          },
        });
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Something went wrong';
      setCollectionError(msg);
    }
  };

  const handlePurchase = () => {
    queryClient.invalidateQueries({ queryKey: ['artwork', id] });
    refetch();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError('');
    try {
      await deleteArtwork(id);
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
      router.push('/marketplace');
    } catch (err) {
      setDeleteError(
        err.response?.data?.error || err.message || 'Failed to delete artwork.'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Skeleton height={500} className="rounded-2xl" />
          <div className="space-y-4">
            <Skeleton width={100} height={14} />
            <Skeleton width="80%" height={36} />
            <Skeleton width={160} height={16} />
            <Skeleton width={120} height={36} />
            <Skeleton count={4} />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    const isNotFound = error?.response?.status === 404;

    if (isNotFound) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-6xl font-bold text-base-content/20 mb-4">404</p>
          <h2 className="text-2xl font-bold mb-2">Artwork Not Found</h2>
          <p className="text-base-content/50 mb-6">
            The artwork you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <a href="/marketplace" className="btn btn-primary">
            Back to Marketplace
          </a>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="alert alert-error max-w-md mx-auto">
          <span>Failed to load artwork. {error?.message}</span>
        </div>
        <a href="/marketplace" className="btn btn-outline btn-sm mt-4">
          Back to Marketplace
        </a>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-lg text-base-content/50">Artwork not found.</p>
        <a href="/marketplace" className="btn btn-outline btn-sm mt-4">
          Back to Marketplace
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <ArtworkImage images={artwork.images} title={artwork.title} />
        </div>

        <div className="flex flex-col gap-6">
          <ArtworkInfo artwork={artwork} />

          {user && (
            <div>
              <button
                type="button"
                onClick={handleCollectionToggle}
                disabled={addToCollection.isPending || removeFromCollection.isPending}
                className={`
                  inline-flex items-center gap-3 px-5 py-3 rounded-xl font-semibold text-sm
                  border transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${isInCollection
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 active:bg-emerald-200'
                    : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 active:bg-emerald-100'
                  }
                `}
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  fill={isInCollection ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <span>
                  {addToCollection.isPending
                    ? 'Adding...'
                    : removeFromCollection.isPending
                      ? 'Removing...'
                      : isInCollection
                        ? 'Added to Collection'
                        : 'Add to Collection'}
                </span>
              </button>
              {collectionError && (
                <p className="text-xs text-red-500 mt-1">{collectionError}</p>
              )}
            </div>
          )}

          {artwork.price != null && (
            <div className="sticky bottom-4 lg:static">
              <BuyNowButton artwork={artwork} onPurchase={handlePurchase} />
            </div>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="btn btn-outline btn-error gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Delete Artwork
            </button>
          )}
        </div>
      </div>

      <CommentSection artwork={artwork} />
    </div>

    {showDeleteModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Artwork</h3>
            <p className="text-stone-500 mb-6">
              Are you sure you want to delete this artwork? This action cannot be undone.
            </p>
          </div>

          {deleteError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
              {deleteError}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { setShowDeleteModal(false); setDeleteError(''); }}
              disabled={isDeleting}
              className="flex-1 py-3 bg-white border border-stone-200 hover:bg-stone-50 text-slate-700 font-semibold rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

ArtworkDetails.propTypes = {
  id: PropTypes.string.isRequired,
};
