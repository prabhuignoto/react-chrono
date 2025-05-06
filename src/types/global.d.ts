// Fix for React 19 TypeScript compatibility issues
import React from 'react';

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
  }
}

export {};
