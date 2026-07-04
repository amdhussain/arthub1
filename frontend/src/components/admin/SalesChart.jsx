'use client';

import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-base-100 border border-base-300 shadow-lg rounded-lg p-3">
      <p className="text-sm font-medium mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: ${Number(entry.value).toLocaleString()}
        </p>
      ))}
    </div>
  );
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
};

export default function SalesChart({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="card bg-base-200/50 border border-base-300 rounded-xl p-5">
        <Skeleton width={160} height={18} />
        <Skeleton height={250} className="mt-4" borderRadius={12} />
      </div>
    );
  }

  const chartData =
    data?.length > 0
      ? data
      : [
          { month: 'Jan', revenue: 0, orders: 0 },
          { month: 'Feb', revenue: 0, orders: 0 },
          { month: 'Mar', revenue: 0, orders: 0 },
        ];

  return (
    <div className="card bg-base-200/50 border border-base-300 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold">Revenue Overview</h3>
          <p className="text-xs text-base-content/50 mt-0.5">Monthly sales performance</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            Revenue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
            Orders
          </span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary, #6366f1)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-primary, #6366f1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-secondary, #ec4899)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-secondary, #ec4899)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-base-300)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: 'var(--color-base-content)' }}
              tickLine={false}
              axisLine={false}
              opacity={0.5}
            />
            <YAxis
              tick={{ fontSize: 12, fill: 'var(--color-base-content)' }}
              tickLine={false}
              axisLine={false}
              opacity={0.5}
              tickFormatter={(v) => `$${v}`}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-primary, #6366f1)"
              fill="url(#revenueGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="var(--color-secondary, #ec4899)"
              fill="url(#ordersGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

SalesChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string,
      revenue: PropTypes.number,
      orders: PropTypes.number,
    })
  ),
  isLoading: PropTypes.bool,
};
