
import React from 'react';

const MinusIcon: React.FunctionComponent = () => (
  <svg
    data-testid="minus-icon"
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
    <path d="M5 12h14" />
  </svg>
);

export default React.memo(MinusIcon);
