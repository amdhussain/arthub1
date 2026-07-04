'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-base-200 via-base-100 to-primary/5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="hero-content text-center relative z-10 px-4"
      >
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-medium tracking-widest uppercase text-primary mb-4"
          >
            The Premier Art Marketplace
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6"
          >
            Discover{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Extraordinary
            </span>{' '}
            Art
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-base-content/70 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Explore unique artworks from emerging and established artists around
            the globe. Buy, sell, and connect with a vibrant creative community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/marketplace" className="btn btn-primary btn-lg px-8">
              Explore Collection
            </Link>
            <Link
              href="/register"
              className="btn btn-outline btn-lg px-8"
            >
              Become an Artist
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-8 mt-12 text-sm text-base-content/50"
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-base-content">12K+</p>
              <p>Artworks</p>
            </div>
            <div className="w-px h-10 bg-base-300" />
            <div className="text-center">
              <p className="text-2xl font-bold text-base-content">3K+</p>
              <p>Artists</p>
            </div>
            <div className="w-px h-10 bg-base-300" />
            <div className="text-center">
              <p className="text-2xl font-bold text-base-content">8K+</p>
              <p>Collectors</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
