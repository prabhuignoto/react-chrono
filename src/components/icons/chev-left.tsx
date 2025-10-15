import React from 'react';

const ChevronLeft: React.FunctionComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block', width: '100%', height: '100%' }}
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

export default React.memo(ChevronLeft);
