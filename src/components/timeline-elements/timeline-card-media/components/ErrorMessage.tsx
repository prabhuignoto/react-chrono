import { memo } from 'react';
import { errorMessage } from '../timeline-card-media.css';

interface ErrorMessageProps {
  message: string;
}

/**
 * Displays an error message when media fails to load
 */
export const LazyErrorMessage = memo(({ message }: ErrorMessageProps) => (
  <span className={errorMessage}>{message}</span>
));
