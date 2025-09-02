
import React from 'react';

const StopIcon: React.FunctionComponent = () => (
  <svg
    data-testid="stop-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-stop-circle"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9 9h6v6H9z" />
  </svg>
);

export default React.memo(StopIcon);
