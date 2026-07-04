'use client';

import { useAdminStats } from '@/hooks/useAdmin';
import AdminStats from '@/components/admin/AdminStats';
import SalesChart from '@/components/admin/SalesChart';
import UsersTable from '@/components/admin/UsersTable';
import ArtworksTable from '@/components/admin/ArtworksTable';

export default function AdminPage() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Analytics</h2>

      <AdminStats stats={stats} isLoading={statsLoading} />

      <SalesChart data={stats?.salesData} isLoading={statsLoading} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <UsersTable />
        <ArtworksTable />
      </div>
    </div>
  );
}
