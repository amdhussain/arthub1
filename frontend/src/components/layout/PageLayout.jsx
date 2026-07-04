'use client';

import PropTypes from 'prop-types';

const themeStyles = {
  home: {
    container: 'bg-gradient-to-br from-amber-50/50 via-white to-rose-50/30',
    card: 'bg-white/70 backdrop-blur-lg border border-rose-100/50 shadow-lg rounded-xl',
    text: 'text-amber-950',
    muted: 'text-amber-800/60',
    heading: 'text-amber-950',
    accent: 'text-rose-600',
  },
  auth: {
    container: 'bg-gradient-to-br from-sky-50/50 via-white to-indigo-50/30',
    card: 'bg-white/70 backdrop-blur-lg border border-indigo-100/50 shadow-lg rounded-xl',
    text: 'text-sky-950',
    muted: 'text-sky-800/60',
    heading: 'text-sky-950',
    accent: 'text-indigo-600',
  },
  marketplace: {
    container: 'bg-gradient-to-br from-teal-50/50 via-white to-emerald-50/30',
    card: 'bg-white/70 backdrop-blur-lg border border-emerald-100/50 shadow-lg rounded-xl',
    text: 'text-teal-950',
    muted: 'text-teal-800/60',
    heading: 'text-teal-950',
    accent: 'text-emerald-600',
  },
  dashboard: {
    container: 'bg-gradient-to-br from-slate-50/50 via-white to-blue-50/20',
    card: 'bg-white/70 backdrop-blur-lg border border-slate-200/50 shadow-lg rounded-xl',
    text: 'text-slate-900',
    muted: 'text-slate-600/70',
    heading: 'text-slate-900',
    accent: 'text-blue-600',
  },
  artwork: {
    container: 'bg-gradient-to-br from-stone-50/50 via-white to-stone-50/30',
    card: 'bg-white/70 backdrop-blur-lg border border-stone-200/50 shadow-lg rounded-xl',
    text: 'text-stone-900',
    muted: 'text-stone-600/70',
    heading: 'text-stone-900',
    accent: 'text-rose-600',
  },
};

export default function PageLayout({ theme, children, className = '' }) {
  const styles = themeStyles[theme] || themeStyles.home;

  return (
    <div className={`${styles.container} ${className} transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  theme: PropTypes.oneOf(['home', 'auth', 'marketplace', 'dashboard', 'artwork'])
    .isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
