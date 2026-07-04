'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTopArtists } from '@/hooks/useArtists';

export default function TopArtists() {
  const { data: artists, isLoading, isError } = useTopArtists();

  return (
    <section className="py-16 md:py-24 bg-base-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
            Creators
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Top Artists</h2>
          <p className="text-base-content/60 mt-3 max-w-xl mx-auto">
            Meet the talented artists making waves in the ArtHub community.
          </p>
        </motion.div>

        {isLoading ? (
          <ArtistSkeleton />
        ) : isError ? (
          <div className="alert alert-error max-w-md mx-auto">
            <span>Failed to load artists.</span>
          </div>
        ) : artists?.length === 0 ? (
          <p className="text-center text-base-content/50">
            No artists yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {artists?.slice(0, 6).map((artist, index) => (
              <motion.div
                key={artist._id || artist.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <Link
                  href={`/artist/${artist._id || artist.id}`}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-2 ring-base-300 group-hover:ring-primary transition-all duration-300 mb-3">
                    <img
                      src={
                        artist.avatar ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${artist.name}`
                      }
                      alt={artist.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                    {artist.name}
                  </h3>
                  <p className="text-xs text-base-content/50 truncate max-w-full">
                    {artist.specialty || artist.medium || 'Artist'}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ArtistSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <Skeleton circle width={96} height={96} />
          <Skeleton width={80} height={14} />
          <Skeleton width={60} height={12} />
        </div>
      ))}
    </div>
  );
}
