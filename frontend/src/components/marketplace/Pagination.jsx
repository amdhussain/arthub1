'use client';

import PropTypes from 'prop-types';

export default function Pagination({ page, pages, onPageChange }) {
  if (!pages || pages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(pages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    const items = [1, ...range, pages];

    const result = [];
    for (let i = 0; i < items.length; i++) {
      if (i > 0) {
        if (items[i] - items[i - 1] > 1) {
          result.push('...');
        }
      }
      result.push(items[i]);
    }

    return result;
  };

  const visible = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Previous page"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {visible.map((item, idx) =>
        item === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-stone-300 text-sm">
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
              item === page
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-800'
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Next page"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};
