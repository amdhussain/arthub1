'use client';

import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';

const themeClassMap = {
  '/': 'theme-home',
  '/login': 'theme-auth',
  '/register': 'theme-auth',
  '/marketplace': 'theme-marketplace',
  '/dashboard': 'theme-dashboard',
};

const ARTWORK_PREFIX = '/artwork/';

function resolveTheme(pathname) {
  if (themeClassMap[pathname]) return themeClassMap[pathname];
  if (pathname.startsWith(ARTWORK_PREFIX)) return 'theme-artwork';
  return '';
}

export default function ThemeWrapper({ children }) {
  const pathname = usePathname();
  const themeClass = resolveTheme(pathname);

  return (
    <div
      className={`flex-1 flex flex-col ${themeClass} transition-colors duration-500`}
      style={{
        backgroundColor: 'var(--page-bg, var(--color-base-200))',
        color: 'var(--page-text, var(--color-base-content))',
      }}
    >
      {children}
    </div>
  );
}

ThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
