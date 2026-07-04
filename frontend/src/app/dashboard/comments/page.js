'use client';

import { useMyComments } from '@/hooks/useComments';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MyCommentsPage() {
  const { data: comments, isLoading } = useMyComments();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
            <Skeleton width="60%" height={16} />
            <Skeleton width="30%" height={12} className="mt-2" />
            <Skeleton width="90%" height={14} className="mt-3" />
          </div>
        ))}
      </div>
    );
  }

  if (!comments?.length) {
    return (
      <div className="text-center py-20">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
          <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-800">No comments yet</h3>
        <p className="text-sm text-slate-500 mt-1">
          Your comments on purchased artworks will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        You have written {comments.length} comment{comments.length !== 1 ? 's' : ''}.
      </p>
      <div className="space-y-3">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {comment.artworkImage && (
                    <img
                      src={comment.artworkImage}
                      alt=""
                      className="w-8 h-8 rounded object-cover shrink-0"
                    />
                  )}
                  <h4 className="text-sm font-semibold text-slate-800 truncate">
                    {comment.artworkTitle || `Artwork #${comment.artworkId}`}
                  </h4>
                </div>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {comment.text}
                </p>
              </div>
              <span className="text-xs text-slate-400 shrink-0 whitespace-nowrap">
                {comment.createdAt
                  ? new Date(comment.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
