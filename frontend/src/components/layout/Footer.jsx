'use client';

import { useState } from 'react';
import Link from 'next/link';


const categories = [
  { href: '/marketplace?category=abstract', label: 'Abstract' },
  { href: '/marketplace?category=modern', label: 'Modern' },
  { href: '/marketplace?category=classic', label: 'Classic' },
  { href: '/marketplace', label: 'View All' },
];

const quickLinks = [
  { href: '/marketplace', label: 'Browse Artworks' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
];

const socialLinks = [
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'X (Twitter)' },
  { href: '#', label: 'Facebook' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl text-white">ArtHub</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Discover and collect extraordinary art from emerging and established
              artists worldwide. ArtHub connects creators with collectors in a
              vibrant online marketplace.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">
              Stay Connected
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Follow us on social media for the latest drops and artist stories.
            </p>
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l5.5 7.5m0 0l-5.5 7.5m5.5-7.5L15 4.5M10 12l5.5 7.5M10 12l-1.5 2M15 4.5h4.5l-5.5 7.5M15 4.5l-4.5 7.5" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
                </svg>
              </a>
            </div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-3">
              Newsletter
            </h3>
            {subscribed ? (
              <p className="text-emerald-400 text-sm font-medium">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 min-w-0 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600 transition-all duration-200 shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <p className="text-center text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} ArtHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
