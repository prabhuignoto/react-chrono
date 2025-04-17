import React, { FunctionComponent, memo, ReactNode } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';
import {
  ContentWrapper,
  IconWrapper,
  ToolbarListItem,
  ToolbarWrapper,
} from './toolbar.styles';
import { ToolbarProps } from '@models/ToolbarProps';

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
  ({ items = [], children = [], theme }) => {
    // Convert children to array to safely handle both single children and arrays
    const childrenArray = React.Children.toArray(children);

    if (!items.length && childrenArray.length === 0) {
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
              {childrenArray[index] && (
                <ContentWrapper>{childrenArray[index]}</ContentWrapper>
              )}
            </ToolbarListItem>
          );
        })}

        {/* Render any children after the mapped items */}
        {childrenArray.slice(items.length)}
      </ToolbarWrapper>
    );
  },
);

Toolbar.displayName = 'Toolbar';

export { Toolbar };
