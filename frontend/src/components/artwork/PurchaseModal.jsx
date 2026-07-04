'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '@/hooks/useAuth';
import { useCreateOrder } from '@/hooks/useOrders';
import { updateArtworkAfterPurchase } from '@/api/artwork';

export default function PurchaseModal({ artwork, onClose }) {
  const { user } = useAuth();
  const createOrder = useCreateOrder();
  const [step, setStep] = useState('confirm');
  const [error, setError] = useState('');

  const artworkId = artwork._id || artwork.id;
  const imageUrl =
    artwork.imageUrl ||
    artwork.image ||
    artwork.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&q=80';
  const artistName =
    artwork.artistName || artwork.artist?.name || artwork.artist || 'Artist';

  const handleConfirm = async () => {
    setError('');
    try {
      await createOrder.mutateAsync({
        artworkId,
        artwork: {
          title: artwork.title,
          price: artwork.price,
          imageUrl,
          artistName,
        },
        buyerInfo: {
          name: user?.name || user?.username || 'Buyer',
          email: user?.email || '',
        },
        totalPrice: artwork.price,
      });

      const currentStock = artwork.stock != null ? Number(artwork.stock) : 100;
      await updateArtworkAfterPurchase(artworkId, {
        stock: Math.max(0, currentStock - 1),
        purchasedBy: [
          ...(Array.isArray(artwork.purchasedBy) ? artwork.purchasedBy : []),
          user?.id || user?._id,
        ].filter(Boolean),
      });

      setStep('success');
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Purchase failed. Please try again.'
      );
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
            <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Purchase Successful</h3>
          <p className="text-stone-500 mb-6">
            Thank you for your purchase of <span className="font-semibold text-slate-700">{artwork.title}</span>.
            A confirmation has been saved to your orders.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">Confirm Purchase</h3>
          <button
            type="button"
            onClick={handleClose}
            disabled={createOrder.isPending}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-all"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-stone-50 rounded-xl p-4">
            <div className="flex items-center gap-4">
              <img
                src={imageUrl}
                alt={artwork.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold text-slate-900">{artwork.title}</p>
                <p className="text-sm text-stone-500">{artistName}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-stone-600">Price</span>
            <span className="font-bold text-lg text-slate-900">
              ${artwork.price != null ? Number(artwork.price).toLocaleString() : '0'}
            </span>
          </div>

          <div className="border-t border-stone-200 pt-4 space-y-3">
            <div>
              <label className="text-sm font-medium text-stone-600 block mb-1">Buyer Name</label>
              <p className="text-slate-900 font-medium">{user?.name || user?.username || 'You'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-stone-600 block mb-1">Buyer Email</label>
              <p className="text-slate-900 font-medium">{user?.email || ''}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-200">
            <span className="text-stone-700 font-semibold">Total</span>
            <span className="font-bold text-lg text-slate-900">
              ${artwork.price != null ? Number(artwork.price).toLocaleString() : '0'}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleConfirm}
          disabled={createOrder.isPending}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-200/50 flex items-center justify-center gap-2"
        >
          {createOrder.isPending ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              Processing...
            </>
          ) : (
            'Confirm Purchase'
          )}
        </button>
      </div>
    </div>
  );
}

PurchaseModal.propTypes = {
  artwork: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    image: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
    artistName: PropTypes.string,
    artist: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ name: PropTypes.string }),
    ]),
    purchasedBy: PropTypes.array,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
