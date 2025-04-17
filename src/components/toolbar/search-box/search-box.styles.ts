import { Theme } from '@models/Theme';
import styled, { css } from 'styled-components';

// Base styles for flex containers
const flexContainer = css`
  display: flex;
  align-items: center;
`;

export const SearchBoxWrapper = styled.div<{ theme: Theme }>`
  ${flexContainer};
  position: relative;
  margin: 0 0.5rem;
  min-width: 220px;
  border-radius: 4px;
  background: ${({ theme }) => theme.toolbarBtnBgColor};
  padding: 0.25rem;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  &:focus-within {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }
`;

export const SearchInput = styled.input<{ theme: Theme }>`
  ${flexContainer};
  background: transparent;
  border: none;
  padding: 0.35rem 0.5rem 0.35rem 2rem;
  color: ${({ theme }) => theme.toolbarTextColor};
  font-size: 0.875rem;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.toolbarTextColor};
    opacity: 0.6;
  }
`;

export const SearchIcon = styled.span<{ theme: Theme }>`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.toolbarTextColor};
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchResultsLabel = styled.div<{ theme: Theme }>`
  ${flexContainer};
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.toolbarTextColor};
  opacity: 0.9;
  white-space: nowrap;

  .separator {
    margin: 0 0.25rem;
    opacity: 0.5;
  }

  span {
    display: inline-block;
  }

  span:first-child,
  span:last-child {
    font-weight: 500;
  }
`;

export const SearchNavButton = styled.button<{
  theme: Theme;
  disabled?: boolean;
}>`
  ${flexContainer};
  justify-content: center;
  background: ${({ theme, disabled }) =>
    disabled ? 'transparent' : theme.toolbarBtnBgColor};
  border: none;
  padding: 0.35rem;
  width: 26px;
  height: 26px;
  margin: 0 0.125rem;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme }) => theme.toolbarTextColor};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 0.7)};
  border-radius: 4px;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    opacity: 1;
    background: ${({ theme }) => theme.primary}22;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
    background: ${({ theme }) => theme.primary}44;
  }

  svg {
    display: block;
  }
`;

export const SearchNavButtonGroup = styled.div`
  ${flexContainer};
  margin-left: 0.25rem;
  padding-left: 0.25rem;
  border-left: 1px solid ${({ theme }) => theme.toolbarTextColor}22;
`;
