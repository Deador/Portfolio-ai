import React from 'react';

/**
 * WarningIcon Component
 * 24×24px SVG warning circle icon for Risk Card variant
 * Uses CSS to inherit color from parent
 */
export const WarningIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Warning icon"
  >
    {/* Outer circle */}
    <circle
      cx="12"
      cy="12"
      r="11"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />

    {/* Exclamation mark */}
    <circle cx="12" cy="8" r="1.5" fill="currentColor" />
    <line
      x1="12"
      y1="11"
      x2="12"
      y2="17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
