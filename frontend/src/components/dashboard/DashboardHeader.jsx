'use client';

import PropTypes from 'prop-types';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardHeader({ title, onMenuToggle }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn btn-ghost btn-circle btn-sm text-slate-600 hover:text-slate-900 lg:hidden"
            onClick={onMenuToggle}
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          {title && (
            <h1 className="text-lg font-semibold text-slate-800 hidden sm:block">{title}</h1>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn btn-ghost btn-circle btn-sm relative text-slate-500 hover:text-slate-700"
            aria-label="Notifications"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-indigo-500 text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
              3
            </span>
          </button>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium ring-2 ring-indigo-100 overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-800 leading-tight">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-slate-500 capitalize">
                  {user?.role || 'user'}
                </p>
              </div>
              <svg className="w-4 h-4 text-slate-400 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-xl z-[1] w-48 p-2 shadow-lg border border-slate-200 mt-2"
            >
              <li>
                <a href="/dashboard/profile" className="text-slate-700">Profile</a>
              </li>
              <li>
                <a href="/dashboard/settings" className="text-slate-700">Settings</a>
              </li>
              <div className="divider my-1" />
              <li>
                <a href="/" className="text-slate-700">Back to Home</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string,
  onMenuToggle: PropTypes.func.isRequired,
};
