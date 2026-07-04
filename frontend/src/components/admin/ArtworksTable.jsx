'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAdminArtworks, useDeleteArtwork } from '@/hooks/useAdmin';

export default function ArtworksTable() {
  const [page, setPage] = useState(1);
  const params = { page, limit: 10 };

  const { data, isLoading, isError } = useAdminArtworks(params);
  const deleteArtwork = useDeleteArtwork();

  const artworks = data?.artworks || [];
  const pages = data?.pages || 1;

  const handleDelete = (artworkId, title) => {
    if (window.confirm(`Delete "${title}"? This action cannot be undone.`)) {
      deleteArtwork.mutate(artworkId);
    }
  };

  return (
    <div className="card bg-base-200/50 border border-base-300 rounded-xl p-5">
      <h3 className="font-semibold mb-4">All Artworks</h3>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton width={48} height={48} borderRadius={8} />
              <Skeleton width={160} height={14} />
              <Skeleton width={80} height={14} />
              <Skeleton width={60} height={14} />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="alert alert-error text-sm">Failed to load artworks.</div>
      ) : artworks.length === 0 ? (
        <p className="text-sm text-base-content/50 text-center py-8">No artworks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Artwork</th>
                <th>Artist</th>
                <th>Price</th>
                <th>Status</th>
                <th>Added</th>
                <th className="w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {artworks.map((art) => (
                <tr key={art._id || art.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-base-300 overflow-hidden shrink-0">
                        <img
                          src={
                            art.images?.[0]?.url ||
                            art.image ||
                            'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=80&h=80&fit=crop'
                          }
                          alt={art.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium truncate max-w-[180px]">
                        {art.title}
                      </span>
                    </div>
                  </td>
                  <td className="text-sm text-base-content/60">
                    {art.artist?.name || art.artistName || '—'}
                  </td>
                  <td className="text-sm font-medium">
                    {art.price != null
                      ? `$${Number(art.price).toLocaleString()}`
                      : '—'}
                  </td>
                  <td>
                    <span
                      className={`badge badge-sm ${
                        art.isSold ? 'badge-neutral' : 'badge-success'
                      }`}
                    >
                      {art.isSold ? 'Sold' : 'Available'}
                    </span>
                  </td>
                  <td className="text-sm text-base-content/50">
                    {art.createdAt
                      ? new Date(art.createdAt).toLocaleDateString()
                      : '—'}
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <a
                        href={`/artwork/${art._id || art.id}`}
                        className="btn btn-ghost btn-xs"
                      >
                        View
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDelete(art._id || art.id, art.title)}
                        disabled={deleteArtwork.isPending}
                        className="btn btn-ghost btn-xs text-error"
                      >
                        {deleteArtwork.isPending ? (
                          <span className="loading loading-spinner loading-xs" />
                        ) : (
                          'Delete'
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="btn btn-ghost btn-xs"
          >
            Prev
          </button>
          <span className="text-xs flex items-center px-2 text-base-content/50">
            {page} / {pages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page >= pages}
            className="btn btn-ghost btn-xs"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
