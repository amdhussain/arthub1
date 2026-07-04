'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '@/hooks/useAuth';
import PurchaseModal from './PurchaseModal';

export default function BuyNowButton({ artwork, onPurchase }) {
  const { user } = useAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const currentUserId = user?.id || user?._id;

  const isArtist =
    currentUserId === artwork.artist?._id ||
    currentUserId === artwork.artist;

  const stock = artwork.stock != null ? Number(artwork.stock) : 100;
  const isSoldOut = stock <= 0;

  if (isArtist) return null;

  if (isSoldOut) {
    return (
      <div className="alert alert-warning gap-2">
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <span className="text-sm font-medium">Currently Unavailable</span>
      </div>
    );
  }

  const handleBuy = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleBuy}
        className="btn btn-primary btn-lg w-full gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 111.5 0 .75.75 0 01-1.5 0z" />
        </svg>
        Buy Now — ${Number(artwork.price).toLocaleString()}
      </button>

      {showModal && (
        <PurchaseModal
          artwork={artwork}
          onClose={() => {
            setShowModal(false);
            if (onPurchase) onPurchase();
          }}
        />
      )}
    </div>
  );
}

BuyNowButton.propTypes = {
  artwork: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    artistName: PropTypes.string,
    isSold: PropTypes.bool,
    stock: PropTypes.number,
    purchasedBy: PropTypes.array,
    artist: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ _id: PropTypes.string }),
    ]),
  }).isRequired,
  onPurchase: PropTypes.func,
};
