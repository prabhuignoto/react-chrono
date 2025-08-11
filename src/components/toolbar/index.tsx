import { FunctionComponent, ReactNode, memo, useCallback } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';
// styled-components toolbar removed; using Vanilla Extract classes
import {
  actionGroup as veActionGroup,
  contentWrapper as veContentWrapper,
  iconWrapper as veIconWrapper,
  navigationGroup as veNavigationGroup,
  searchControls as veSearchControls,
  searchGroup as veSearchGroup,
  searchInfo as veSearchInfo,
  searchInput as veSearchInput,
  searchWrapper as veSearchWrapper,
  toolbarListItem as veToolbarListItem,
  toolbarSection as veToolbarSection,
  toolbarSectionRecipe as veToolbarSectionRecipe,
  toolbarWrapper as veToolbarWrapper,
} from './toolbar.css';
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
  ({ items = [], children = [], theme, useVeStyles = true }) => {
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
      <div className={veToolbarWrapper} role="toolbar" aria-label="Timeline toolbar">
        {items.map(({ label, id, icon }, index) => {
          if (!id) {
            console.warn('Toolbar item is missing required id property');
            return null;
          }

          return (
            <div className={veToolbarListItem} aria-label={label} key={id} role="button" tabIndex={0} onKeyDown={(event) => handleKeyDown(event, index)}>
              {icon && <span className={veIconWrapper}>{icon}</span>}
              {Array.isArray(children) && (children as ReactNode[])[index] && (
                <span className={veContentWrapper}>{(children as ReactNode[])[index]}</span>
              )}
            </div>
          );
        })}
      </div>
    );
  },
);

Toolbar.displayName = 'Toolbar';

export { Toolbar };
