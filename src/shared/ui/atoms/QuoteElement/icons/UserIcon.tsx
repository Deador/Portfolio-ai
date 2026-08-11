import React from 'react';

/**
 * UserIcon Component
 *
 * DS "user"/profile avatar (bulk style) exported from Figma
 * (node 1799:6158, component set 670:993). 32×32 viewBox.
 * Renders a circular avatar with a two-tone user silhouette.
 */
export const UserIcon: React.FC = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="16" fill="#1F1F1F" />
      <path
        opacity="0.4"
        d="M16 6C13.38 6 11.25 8.13 11.25 10.75C11.25 13.32 13.26 15.4 15.88 15.49C15.96 15.48 16.04 15.48 16.1 15.49C16.12 15.49 16.13 15.49 16.15 15.49C16.16 15.49 16.16 15.49 16.17 15.49C18.73 15.4 20.74 13.32 20.75 10.75C20.75 8.13 18.62 6 16 6Z"
        fill="#C7C7C7"
      />
      <path
        d="M21.08 18.1499C18.29 16.2899 13.74 16.2899 10.93 18.1499C9.65996 18.9999 8.95996 20.1499 8.95996 21.3799C8.95996 22.6099 9.65996 23.7499 10.92 24.5899C12.32 25.5299 14.16 25.9999 16 25.9999C17.84 25.9999 19.68 25.5299 21.08 24.5899C22.34 23.7399 23.04 22.5999 23.04 21.3599C23.03 20.1299 22.34 18.9899 21.08 18.1499Z"
        fill="#A9A9A9"
      />
    </svg>
  );
};