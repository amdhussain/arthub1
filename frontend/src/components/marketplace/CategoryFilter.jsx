'use client';

import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchCategories } from '@/api/category';

const ALL = 'all';

export default function CategoryFilter({ value, onChange }) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(ALL)}
        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
          value === ALL || !value
            ? 'bg-emerald-700 text-white shadow-sm'
            : 'bg-white text-stone-600 border border-stone-200 hover:border-emerald-300 hover:text-emerald-700'
        }`}
      >
        All
      </button>

      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} width={70} height={28} borderRadius={6} inline />
          ))
        : categories?.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                value === cat.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
