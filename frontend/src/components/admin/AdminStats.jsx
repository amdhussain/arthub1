'use client';

import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function AdminStats({ stats, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="stat bg-base-200/50 border border-base-300 rounded-xl p-5">
            <Skeleton width={80} height={14} />
            <Skeleton width={100} height={32} className="mt-2" />
            <Skeleton width={60} height={12} className="mt-1" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: 'Total Users',
      value: stats?.totalUsers ?? 0,
      change: stats?.userChange ?? '+0%',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      bg: 'from-sky-500/10 to-blue-500/5',
      iconColor: 'text-sky-600',
    },
    {
      label: 'Total Artists',
      value: stats?.totalArtists ?? 0,
      change: stats?.artistChange ?? '+0%',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      ),
      bg: 'from-violet-500/10 to-purple-500/5',
      iconColor: 'text-violet-600',
    },
    {
      label: 'Total Revenue',
      value: stats?.totalRevenue != null ? `$${Number(stats.totalRevenue).toLocaleString()}` : '$0',
      change: stats?.revenueChange ?? '+0%',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: 'from-emerald-500/10 to-teal-500/5',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Total Artworks',
      value: stats?.totalArtworks ?? 0,
      change: stats?.artworkChange ?? '+0%',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
      bg: 'from-amber-500/10 to-orange-500/5',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="stat bg-base-200/50 border border-base-300 rounded-xl p-5 relative overflow-hidden"
        >
          <div className={`absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${card.bg} -translate-y-1/3 translate-x-1/3`} />
          <div className="relative z-10">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.bg} flex items-center justify-center ${card.iconColor}`}>
              {card.icon}
            </div>
            <div className="stat-title text-xs text-base-content/50 mt-3">{card.label}</div>
            <div className="stat-value text-2xl font-bold mt-1">{card.value}</div>
            <div className="stat-desc text-xs text-success mt-1">{card.change}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

AdminStats.propTypes = {
  stats: PropTypes.shape({
    totalUsers: PropTypes.number,
    totalArtists: PropTypes.number,
    totalRevenue: PropTypes.number,
    totalArtworks: PropTypes.number,
    userChange: PropTypes.string,
    artistChange: PropTypes.string,
    revenueChange: PropTypes.string,
    artworkChange: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
};
