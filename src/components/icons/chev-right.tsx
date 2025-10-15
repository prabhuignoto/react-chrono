import React from 'react';

const ChevronRightIcon: React.FunctionComponent = () => (
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
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default React.memo(ChevronRightIcon);
