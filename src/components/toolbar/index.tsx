import { FunctionComponent, memo, useCallback } from 'react';
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
    if (!items.length) {
      return null;
    }

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent, index: number) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          // Trigger click on the child element if it exists
          const contentWrapper = event.currentTarget.querySelector(
            '[role="button"]',
          ) as HTMLElement;
          if (contentWrapper && contentWrapper.click) {
            contentWrapper.click();
          }
        }

        // Arrow key navigation
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          const toolbar = event.currentTarget.parentElement;
          const toolbarItems = toolbar?.querySelectorAll(
            '[role="button"][tabindex="0"]',
          );

          if (toolbarItems && toolbarItems.length > 1) {
            const currentIndex = Array.from(toolbarItems).indexOf(
              event.currentTarget,
            );
            let nextIndex;

            if (event.key === 'ArrowLeft') {
              nextIndex =
                currentIndex > 0 ? currentIndex - 1 : toolbarItems.length - 1;
            } else {
              nextIndex =
                currentIndex < toolbarItems.length - 1 ? currentIndex + 1 : 0;
            }

            (toolbarItems[nextIndex] as HTMLElement).focus();
          }
        }
      },
      [],
    );

    return (
      <ToolbarWrapper
        theme={theme}
        role="toolbar"
        aria-label="Timeline toolbar"
      >
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
              theme={theme}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {icon && <IconWrapper>{icon}</IconWrapper>}
              {children[index] && (
                <ContentWrapper>{children[index]}</ContentWrapper>
              )}
            </ToolbarListItem>
          );
        })}
      </ToolbarWrapper>
    );
  },
);

Toolbar.displayName = 'Toolbar';

export { Toolbar };
