'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAuth } from '@/hooks/useAuth';
import { useMyOrders, useDeleteOrder } from '@/hooks/useOrders';

export default function OrdersPage() {
  const { user } = useAuth();
  const { data: orders, isLoading, isError, error } = useMyOrders();
  const deleteMutation = useDeleteOrder();
  const [deletingOrderId, setDeletingOrderId] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const deletingOrder = deletingOrderId
    ? orders?.find((o) => o._id === deletingOrderId)
    : null;

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const handleDelete = async () => {
    if (!deletingOrderId) return;
    setDeleteError('');
    try {
      await deleteMutation.mutateAsync(deletingOrderId);
      setDeletingOrderId(null);
      setSuccessMsg('Order deleted successfully.');
    } catch (err) {
      setDeleteError(
        err.response?.data?.message || err.message || 'Failed to delete order.'
      );
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <p className="text-slate-500 mb-4">Please log in to view your orders.</p>
        <Link href="/login" className="btn btn-primary btn-sm">
          Login
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">My Orders</h2>
        <p className="text-sm text-slate-500 mt-1">View your purchase history.</p>
      </div>

      {successMsg && (
        <div className="alert alert-success gap-2">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{successMsg}</span>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex gap-4">
                <Skeleton width={80} height={80} borderRadius={12} />
                <div className="flex-1 space-y-2">
                  <Skeleton width={180} height={18} />
                  <Skeleton width={120} height={14} />
                  <Skeleton width={100} height={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-base-content/50">
          <p className="text-lg font-medium">Failed to load orders</p>
          <p className="text-sm mt-1">{error?.message}</p>
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
          <div className="mb-6">
            <svg className="w-20 h-20 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h3 className="text-slate-800 text-xl font-bold mb-2">No orders yet</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            You haven&apos;t purchased any artworks yet.
          </p>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-200/60 hover:bg-indigo-700 transition-all duration-200"
          >
            Browse Artworks
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="shrink-0">
                  <img
                    src={
                      order.artwork?.imageUrl ||
                      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=160&q=80'
                    }
                    alt={order.artwork?.title || 'Artwork'}
                    className="w-full sm:w-20 h-20 rounded-xl object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {order.artwork?.title || 'Untitled'}
                      </h4>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {order.artwork?.artistName || 'Unknown Artist'}
                      </p>
                    </div>
                    <span className="badge badge-success badge-sm shrink-0 capitalize">
                      {order.status || 'completed'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-slate-500">
                    <span>
                      Price: <strong className="text-slate-700">${order.totalPrice != null ? Number(order.totalPrice).toLocaleString() : '—'}</strong>
                    </span>
                    <span>
                      Purchased:{' '}
                      {order.purchasedAt
                        ? new Date(order.purchasedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : '—'}
                    </span>
                    {order.buyerInfo?.email && (
                      <span className="text-xs text-slate-400">{order.buyerInfo.email}</span>
                    )}
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      type="button"
                      onClick={() => { setDeletingOrderId(order._id); setDeleteError(''); }}
                      className="btn btn-outline btn-error btn-sm gap-1.5"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      Delete Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {deletingOrder && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Order</h3>
            <p className="text-stone-500 mb-6">
              Are you sure you want to delete this order? This will remove it from your purchase history.
            </p>
          </div>

          {deleteError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
              {deleteError}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { setDeletingOrderId(null); setDeleteError(''); }}
              disabled={deleteMutation.isPending}
              className="flex-1 py-3 bg-white border border-stone-200 hover:bg-stone-50 text-slate-700 font-semibold rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              {deleteMutation.isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
