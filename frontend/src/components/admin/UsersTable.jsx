'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAdminUsers, useUpdateUserRole } from '@/hooks/useAdmin';

const roles = ['user', 'artist', 'admin'];

export default function UsersTable() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const params = { page, limit: 10, ...(search && { search }) };

  const { data, isLoading, isError } = useAdminUsers(params);
  const updateRole = useUpdateUserRole();

  const users = data?.users || [];
  const pages = data?.pages || 1;

  const handleRoleChange = (userId, newRole) => {
    if (window.confirm(`Change this user's role to "${newRole}"?`)) {
      updateRole.mutate({ userId, role: newRole });
    }
  };

  return (
    <div className="card bg-base-200/50 border border-base-300 rounded-xl p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="font-semibold">Users Management</h3>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="input input-bordered input-sm w-full sm:w-56"
        />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton circle width={32} height={32} />
              <Skeleton width={140} height={14} />
              <Skeleton width={100} height={14} />
              <Skeleton width={80} height={14} />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="alert alert-error text-sm">Failed to load users.</div>
      ) : users.length === 0 ? (
        <p className="text-sm text-base-content/50 text-center py-8">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th className="w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="bg-neutral text-neutral-content rounded-full w-7 h-7 flex items-center justify-center text-[10px] font-medium shrink-0">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <span className="text-sm font-medium truncate max-w-[120px]">
                        {user.name || 'Unknown'}
                      </span>
                    </div>
                  </td>
                  <td className="text-sm text-base-content/60">{user.email || '—'}</td>
                  <td>
                    <span className={`badge badge-sm capitalize ${roleBadge(user.role)}`}>
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="text-sm text-base-content/50">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : '—'}
                  </td>
                  <td>
                    <select
                      value={user.role || 'user'}
                      onChange={(e) => handleRoleChange(user._id || user.id, e.target.value)}
                      className="select select-bordered select-xs w-full"
                      disabled={updateRole.isPending}
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r.charAt(0).toUpperCase() + r.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="btn btn-ghost btn-xs"
          >
            Prev
          </button>
          <span className="text-xs flex items-center px-2 text-base-content/50">
            {page} / {pages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page >= pages}
            className="btn btn-ghost btn-xs"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function roleBadge(role) {
  switch (role) {
    case 'admin':
      return 'badge-error';
    case 'artist':
      return 'badge-warning';
    default:
      return 'badge-ghost';
  }
}
