import React from 'react';

/**
 * Logo Component
 * 40×48 brand monogram (header logo)
 * Geometry mirrors Figma "logo" (IMAGE-SVG, instance 1863:6978, 40×48)
 * Uses currentColor to inherit color from parent
 */
export const Logo: React.FC = () => (
  <svg
    width="40"
    height="48"
    viewBox="0 0 40 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g clipPath="url(#logoClip0)">
      <path
        d="M10.7133 1.81152C10.7133 1.81152 4.06027 7.23349 2.66231 12.1908C-0.377452 22.97 5.05828 32.4723 14.6893 35.2191C20.5794 36.8989 25.3462 36.4816 30.398 32.9692C34.1541 30.3577 36.9088 27.5847 37.2999 22.97C37.6829 18.4507 36.6461 14.799 32.4891 13.1707C26.2351 10.7209 22.2592 13.738 18.5379 18.0703C15.4085 21.7136 15.0692 25.0043 14.6893 29.8295C14.2446 35.4778 17.5757 46.0883 17.5757 46.0883"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <clipPath id="logoClip0">
        <rect width="40" height="48" fill="white" />
      </clipPath>
    </defs>
  </svg>
);