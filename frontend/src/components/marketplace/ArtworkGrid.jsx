'use client';

import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ArtworkCard from './ArtworkCard';

export default function ArtworkGrid({ artworks, isLoading, isError, error }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md border border-stone-100 overflow-hidden">
            <Skeleton height={280} className="rounded-none" />
            <div className="p-4 space-y-2">
              <Skeleton width="80%" height={16} />
              <Skeleton width="60%" height={12} />
              <Skeleton width="40%" height={14} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <span className="text-sm font-medium">Failed to load artworks. {error?.message}</span>
      </div>
    );
  }

  if (!artworks || artworks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-stone-400 gap-3">
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-lg font-medium text-stone-500">No artworks found</p>
        <p className="text-sm">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork._id || artwork.id} artwork={artwork} />
      ))}
    </div>
  );
}

ArtworkGrid.propTypes = {
  artworks: PropTypes.array,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  error: PropTypes.shape({ message: PropTypes.string }),
};
