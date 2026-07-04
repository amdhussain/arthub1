'use client';

import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useMyCollection, useRemoveFromCollection } from '@/hooks/useCollection';

export default function CollectionPage() {
  const { data: items, isLoading, isError, error } = useMyCollection();
  const removeMutation = useRemoveFromCollection();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">My Collection</h2>
          <p className="text-sm text-slate-500 mt-1">Artworks you&apos;ve saved.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <Skeleton height={200} className="rounded-none" />
              <div className="p-4 space-y-2">
                <Skeleton width="70%" height={16} />
                <Skeleton width="50%" height={14} />
                <Skeleton width="40%" height={14} />
                <Skeleton width={100} height={32} borderRadius={8} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <p className="text-lg font-medium text-slate-600">Failed to load collection</p>
        <p className="text-sm text-slate-400 mt-1">{error?.message}</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="flex flex-col items-center text-center max-w-md">
          <div className="mb-6">
            <svg className="w-20 h-20 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h2 className="text-slate-800 text-xl font-bold mb-2">Your collection is empty</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            Explore our amazing collection of artworks and add your favorites here.
          </p>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-200/60 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200/70 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            Explore Artworks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">My Collection</h2>
        <p className="text-sm text-slate-500 mt-1">
          {items.length} {items.length === 1 ? 'artwork' : 'artworks'} saved.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 flex flex-col"
          >
            <Link href={`/artwork/${item.artworkId}`} className="block">
              <figure className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={
                    item.artwork?.imageUrl ||
                    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop'
                  }
                  alt={item.artwork?.title || 'Artwork'}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </figure>
            </Link>
            <div className="p-4 space-y-1.5 flex-1 flex flex-col">
              <Link href={`/artwork/${item.artworkId}`}>
                <h3 className="text-slate-900 font-bold text-sm truncate hover:text-emerald-700 transition-colors">
                  {item.artwork?.title || 'Untitled'}
                </h3>
              </Link>
              <p className="text-slate-500 text-xs truncate">
                {item.artwork?.artist || 'Unknown Artist'}
              </p>
              {item.artwork?.category && (
                <span className="badge badge-ghost badge-xs">{item.artwork.category}</span>
              )}
              <p className="font-bold text-emerald-700 text-sm pt-1">
                {item.artwork?.price != null
                  ? `$${Number(item.artwork.price).toLocaleString()}`
                  : 'Price on request'}
              </p>
              <div className="mt-auto pt-3 flex gap-2">
                <Link
                  href={`/artwork/${item.artworkId}`}
                  className="flex-1 text-center text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 py-2 rounded-lg transition-colors"
                >
                  View Details
                </Link>
                <button
                  type="button"
                  onClick={() => removeMutation.mutate(item.artworkId)}
                  disabled={removeMutation.isPending}
                  className="flex-1 text-center text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {removeMutation.isPending ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
