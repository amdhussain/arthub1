'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import artworksData from '@/../public/data.json';

export default function FeaturedArtworks() {
  const artworks = artworksData.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-emerald-700 mb-2">
              Featured
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Artworks</h2>
          </div>
          <Link
            href="/marketplace"
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
          >
            View All
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link
                href={`/artwork/${artwork.id}`}
                className="group block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                  <h3 className="text-white font-bold text-lg truncate">{artwork.title}</h3>
                  <p className="text-white/70 text-sm mt-1 line-clamp-2">{artwork.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
