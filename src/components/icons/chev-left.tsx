import React from 'react';

const ChevLeftIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
  >
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

export default ChevLeftIcon;
