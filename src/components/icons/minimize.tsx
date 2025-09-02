import React from 'react';

const MinimizeIcon: React.FunctionComponent = () => (
  <svg
    data-testid="minimize-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-minimize-2"
  >
    <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
  </svg>
);

export default React.memo(MinimizeIcon);
