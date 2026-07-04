'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';

export default function ArtworkImage({ images, title }) {
  const [zoomed, setZoomed] = useState(false);
  const mainImage =
    images?.[0]?.url ||
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=900&fit=crop';

  return (
    <div className="space-y-3">
      <div
        className={`relative overflow-hidden rounded-2xl bg-base-200 cursor-crosshair transition-all duration-300 ${
          zoomed ? 'scale-105' : ''
        }`}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <img
          src={mainImage}
          alt={title}
          className={`w-full h-auto object-cover transition-transform duration-500 ${
            zoomed ? 'scale-110' : 'scale-100'
          }`}
          style={{ maxHeight: '70vh' }}
        />
        {images?.length > 1 && (
          <div className="absolute top-3 left-3 flex gap-1.5">
            {images.slice(0, 4).map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === 0 ? 'bg-primary' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {images?.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                i === 0 ? 'border-primary' : 'border-transparent hover:border-base-300'
              }`}
            >
              <img
                src={img.thumbnail || img.url}
                alt={`${title} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

ArtworkImage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      thumbnail: PropTypes.string,
    })
  ),
  title: PropTypes.string.isRequired,
};
