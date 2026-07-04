'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const pageTitles = {
  '/dashboard': 'Overview',
  '/dashboard/my-artworks': 'My Artworks',
  '/dashboard/collection': 'My Collection',
  '/dashboard/comments': 'My Comments',
  '/dashboard/orders': 'My Orders',
  '/dashboard/sales': 'Sales Analytics',
  '/dashboard/users': 'Users Management',
  '/dashboard/profile': 'Profile',
  '/dashboard/settings': 'Settings',
  '/dashboard/admin': 'Admin',
};

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Dashboard';

  return (
    <div className="min-h-[100dvh] flex bg-slate-50">
      <Sidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title={title}
          onMenuToggle={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
