import { FunctionComponent, memo, useState } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';
import {
  ContentWrapper,
  IconWrapper,
  ToolbarListItem,
  ToolbarWrapper,
  SearchBoxWrapper,
  SearchInput,
  SearchIcon,
} from './toolbar.styles';
import { ToolbarProps } from '@models/ToolbarProps';
import { useDebounce } from '../../hooks/useDebounce';
import { SearchToolbarItem } from '@models/ToolbarItem';

/**
 * @description A reusable toolbar component that renders a list of items with icons and content
 * @component
 * @param {Object} props - Component properties
 * @param {Array} props.items - Array of toolbar items to render
 * @param {ReactNode[]} props.children - Child elements to render within each toolbar item
 * @param {Theme} props.theme - Theme configuration for styling
 *
 * @example
 * ```tsx
 * <Toolbar
 *   items={[{ id: '1', label: 'Action', icon: <Icon /> }]}
 *   theme={theme}
 * >
 *   <Content />
 * </Toolbar>
 * ```
 */
const Toolbar: FunctionComponent<ToolbarProps> = memo(
  ({ items = [], searchItems = [], children = [], theme }) => {
    if (!items.length && !searchItems.length) {
      return null;
    }

    return (
      <ToolbarWrapper theme={theme} role="toolbar">
        {items.map(({ label, id, icon }, index) => {
          if (!id) {
            console.warn('Toolbar item is missing required id property');
            return null;
          }

          return (
            <ToolbarListItem
              aria-label={label}
              key={id}
              role="button"
              tabIndex={0}
            >
              {icon && <IconWrapper>{icon}</IconWrapper>}
              {children[index] && (
                <ContentWrapper>{children[index]}</ContentWrapper>
              )}
            </ToolbarListItem>
          );
        })}

        {searchItems.map(({ id, label, placeholder, onSearch }) => {
          const [searchText, setSearchText] = useState('');
          const debouncedSearch = useDebounce(onSearch, 300);

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearchText(value);
            debouncedSearch(value);
          };

          return (
            <SearchBoxWrapper key={id} theme={theme}>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput
                type="text"
                value={searchText}
                onChange={handleChange}
                placeholder={placeholder || 'Search...'}
                aria-label={label || 'Search'}
                theme={theme}
                data-testid="timeline-search-input"
              />
            </SearchBoxWrapper>
          );
        })}
      </ToolbarWrapper>
    );
  },
);

Toolbar.displayName = 'Toolbar';

export { Toolbar };
