import React from 'react';

const ChevDownIcon: React.FunctionComponent = () => (
  <svg
    data-testid="chev-down-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    style={{ display: 'block', width: '100%', height: '100%' }}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default React.memo(ChevDownIcon);
