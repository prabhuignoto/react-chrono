import { memo } from 'react';
import { ErrorMessage as StyledErrorMessage } from '../timeline-card-media.styles';

interface ErrorMessageProps {
  message: string;
}

/**
 * Displays an error message when media fails to load
 */
export const LazyErrorMessage = memo(({ message }: ErrorMessageProps) => (
  <StyledErrorMessage>{message}</StyledErrorMessage>
));
