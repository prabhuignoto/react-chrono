import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  errorBoundaryContainer,
  errorMessage,
  errorTitle,
  retryButton,
} from './error-boundary.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class TimelineErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console or external service
    console.error('Timeline Error:', error, errorInfo);

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      // Default error UI
      return (
        <div className={errorBoundaryContainer}>
          <h2 className={errorTitle}>Something went wrong</h2>
          <p className={errorMessage}>
            {this.state.error?.message ||
              'An unexpected error occurred in the timeline component.'}
          </p>
          <button
            className={retryButton}
            onClick={this.handleReset}
            type="button"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
