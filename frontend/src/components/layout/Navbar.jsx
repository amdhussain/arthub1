'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { useAuth } from '@/hooks/useAuth';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Search } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/marketplace', label: 'Browse Artworks' },
  { href: '/dashboard', label: 'Dashboard' },
];

function isActiveLink(href, pathname) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('Search query:', searchQuery);
      setSearchOpen(false);
      setSearchQuery('');
    }
    if (e.key === 'Escape') {
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-white/80 backdrop-blur-md border-b border-slate-200'
      }`}
    >
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
          <span className="text-white font-bold text-base">A</span>
        </div>
        <span className="font-bold text-xl text-slate-900">ArtHub</span>
      </Link>

      <div className="hidden lg:flex items-center gap-1">
        {navLinks.map((link) => {
          const active = isActiveLink(link.href, pathname);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                active
                  ? 'text-indigo-600 font-bold bg-indigo-50'
                  : 'text-slate-600 hover:text-indigo-500 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        {searchOpen ? (
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            onBlur={() => {
              if (!searchQuery) {
                setSearchOpen(false);
              }
            }}
            placeholder="Search artworks..."
            className="w-40 sm:w-56 border border-slate-200 rounded-full px-4 py-1 bg-slate-50 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200"
          />
        ) : (
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-indigo-500 hover:bg-slate-100 transition-all duration-200"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>
        )}

        {loading ? (
          <div className="flex gap-2">
            <Skeleton width={80} height={36} borderRadius={8} />
            <Skeleton circle width={36} height={36} />
          </div>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ring-2 ring-indigo-100 hover:ring-indigo-300 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden bg-indigo-50"
            >
              {user.avatar ? (
                <img src={user.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-xl z-[1] w-52 p-2 shadow-lg border border-slate-200 mt-2"
            >
              <li className="menu-title">
                <span className="text-slate-500 text-xs">{user.name || 'User'}</span>
              </li>
              <li>
                <Link href="/dashboard/profile" className="text-slate-700">Profile</Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-slate-700">Dashboard</Link>
              </li>
              <li>
                <Link href="/dashboard/my-artworks" className="text-slate-700">My Artworks</Link>
              </li>
              <li>
                <Link href="/dashboard/orders" className="text-slate-700">My Orders</Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="text-slate-700">Settings</Link>
              </li>
              <div className="divider my-1" />
              <li>
                <button type="button" onClick={logout} className="text-red-500">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-500 rounded-lg hover:bg-slate-50 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>
        )}

        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-indigo-500 hover:bg-slate-100 transition-all duration-200 lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            pathname={pathname}
            user={user}
            onClose={() => setMenuOpen(false)}
            onLogout={() => {
              logout();
              setMenuOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}

function MobileMenu({ pathname, user, onClose, onLogout }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] lg:hidden"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl p-6 flex flex-col gap-4"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-lg text-slate-900">ArtHub</span>
          </div>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-1 pt-4">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? 'text-indigo-600 font-bold bg-indigo-50'
                      : 'text-slate-600 hover:text-indigo-500 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="divider my-4" />

          {user ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 px-3 py-3 mb-1">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-indigo-100">
                  {user.avatar ? (
                    <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm text-slate-800 truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
              <Link href="/dashboard" onClick={onClose} className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-500 hover:bg-slate-50 rounded-lg transition-all duration-200">
                Dashboard
              </Link>
              <Link href="/dashboard/orders" onClick={onClose} className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-500 hover:bg-slate-50 rounded-lg transition-all duration-200">
                My Orders
              </Link>
              <Link href="/dashboard/settings" onClick={onClose} className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-500 hover:bg-slate-50 rounded-lg transition-all duration-200">
                Settings
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 text-left"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/login"
                onClick={onClose}
                className="w-full px-4 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:text-indigo-500 hover:border-indigo-200 transition-all duration-200 text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-200 text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

MobileMenu.propTypes = {
  pathname: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};
