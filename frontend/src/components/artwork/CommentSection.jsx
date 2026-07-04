'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '@/hooks/useAuth';
import { useMyOrders } from '@/hooks/useOrders';
import { useComments, useAddComment } from '@/hooks/useComments';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function CommentSection({ artwork }) {
  const { user } = useAuth();
  const artworkId = artwork._id || artwork.id;
  const { data: comments, isLoading, isError } = useComments(artworkId);
  const { data: orders } = useMyOrders({ enabled: !!user });

  const currentUserId = user?.id || user?._id;
  const isArtist = !!currentUserId && !!artwork.artist?._id && (
    currentUserId === artwork.artist?._id
  );

  const hasPurchased = Array.isArray(orders) && orders.some(
    (o) => String(o.artworkId) === String(artworkId)
  );

  const canComment = user && !isArtist && hasPurchased;

  return (
    <section className="border-t border-base-300 pt-8 mt-10">
      <h2 className="text-xl font-bold mb-6">
        Comments
        {comments?.length > 0 && (
          <span className="text-base-content/40 font-normal text-sm ml-2">
            ({comments.length})
          </span>
        )}
      </h2>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton circle width={36} height={36} />
              <div className="flex-1 space-y-1.5">
                <Skeleton width={120} height={14} />
                <Skeleton width="90%" height={12} />
                <Skeleton width="60%" height={12} />
              </div>
            </div>
          ))}
        </div>
      ) : comments?.length > 0 ? (
        <div className="space-y-4 mb-6">
          {comments.map((comment) => (
            <CommentItem key={comment._id || comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-base-content/50">
          <svg className="w-12 h-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-sm font-medium">No comments yet</p>
          {(canComment && !isError) && (
            <p className="text-xs mt-1">Be the first to share your thoughts.</p>
          )}
        </div>
      )}

      {!user ? (
        <div className="alert bg-base-200 border-base-300">
          <span className="text-sm text-base-content/60">
            <a href="/login" className="text-primary hover:underline">Sign in</a> to join the conversation.
          </span>
        </div>
      ) : isArtist ? (
        <div className="alert bg-base-200 border-base-300">
          <span className="text-sm text-base-content/60">
            Comments are for collectors who own this piece.
          </span>
        </div>
      ) : !hasPurchased ? (
        <div className="alert bg-base-200 border-base-300">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="text-sm text-base-content/60">
            Purchase this artwork to leave a comment.
          </span>
        </div>
      ) : (
        <CommentForm artworkId={artworkId} />
      )}
    </section>
  );
}

function CommentItem({ comment }) {
  const avatarUrl =
    comment.user?.avatar ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${comment.user?.name || 'U'}`;

  return (
    <div className="flex gap-3">
      <img
        src={avatarUrl}
        alt={comment.user?.name || 'User'}
        className="w-9 h-9 rounded-full shrink-0 bg-base-300"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">
            {comment.user?.name || 'Anonymous'}
          </p>
          <span className="text-[11px] text-base-content/40">
            {comment.createdAt
              ? new Date(comment.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : ''}
          </span>
        </div>
        <p className="text-sm text-base-content/80 mt-0.5 leading-relaxed">
          {comment.text}
        </p>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
};

function CommentForm({ artworkId }) {
  const [text, setText] = useState('');
  const addComment = useAddComment(artworkId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment.mutate(text.trim(), {
      onSuccess: () => setText(''),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-start">
      <div className="flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts about this artwork..."
          rows={2}
          className="textarea textarea-bordered w-full text-sm resize-none bg-white text-gray-900 placeholder-gray-400 border-gray-300"
          maxLength={1000}
        />
        <p className="text-[11px] text-base-content/40 mt-1">
          {text.length}/1000
        </p>
      </div>
      <button
        type="submit"
        disabled={!text.trim() || addComment.isPending}
        className="btn btn-primary btn-sm mt-1"
      >
        {addComment.isPending ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          'Post'
        )}
      </button>
    </form>
  );
}

CommentForm.propTypes = {
  artworkId: PropTypes.string.isRequired,
};

CommentSection.propTypes = {
  artwork: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    isSold: PropTypes.bool,
    artist: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ _id: PropTypes.string }),
    ]),
  }).isRequired,
};
