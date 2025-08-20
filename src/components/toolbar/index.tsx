import React, { FunctionComponent, ReactNode, memo } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';
// styled-components toolbar removed; using Vanilla Extract classes
import {
  actionGroup as veActionGroup,
  contentWrapper as veContentWrapper,
  extraControls as veExtraControls,
  extraControlChild as veExtraControlChild,
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
  toolbarIconButton,
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
  ({
    items = [],
    children = [],
    theme,
    useVeStyles = true,
    style,
    ...rest
  }) => {
    if (!items.length) {
      return null;
    }

    // Avoid nested toolbar roles if children already provide one
    const hasNestedToolbarRole = React.Children.toArray(children).some(
      (child) =>
        React.isValidElement(child) && (child.props as any)?.role === 'toolbar',
    );

    return (
      <div
        className={veToolbarWrapper}
        role={hasNestedToolbarRole ? undefined : 'toolbar'}
        aria-label={
          hasNestedToolbarRole ? undefined : 'Timeline toolbar sample'
        }
        aria-orientation={hasNestedToolbarRole ? undefined : 'horizontal'}
        style={style}
        {...rest}
      >
        {items.map(
          (
            { label, id, icon, minimizable, isMinimized, onToggleMinimize },
            index,
          ) => {
            if (!id) {
              console.warn('Toolbar item is missing required id property');
              return null;
            }

            const handleMinimizeToggle = () => {
              if (onToggleMinimize && minimizable) {
                onToggleMinimize(id, !isMinimized);
              }
            };

            return (
              <div
                className={veToolbarListItem}
                aria-label={label}
                key={id}
                role="group"
              >
                {icon && <span className={veIconWrapper}>{icon}</span>}
                {minimizable && (
                  <button
                    className={toolbarIconButton({
                      state: isMinimized ? 'minimized' : 'expanded',
                      animation: 'bounce',
                    })}
                    onClick={handleMinimizeToggle}
                    aria-label={
                      isMinimized ? `Maximize ${label}` : `Minimize ${label}`
                    }
                    type="button"
                    title={
                      isMinimized ? `Maximize ${label}` : `Minimize ${label}`
                    }
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1,
                        fontSize: 'inherit',
                        fontWeight: 'bold',
                      }}
                    >
                      {isMinimized ? '⬛' : '⬜'}
                    </span>
                  </button>
                )}
                {!isMinimized &&
                  Array.isArray(children) &&
                  (children as ReactNode[])[index] && (
                    <span className={veContentWrapper}>
                      {(children as ReactNode[])[index]}
                    </span>
                  )}
                {!isMinimized &&
                  !Array.isArray(children) &&
                  index === 0 &&
                  children && (
                    <span className={veContentWrapper}>
                      {children as ReactNode}
                    </span>
                  )}
              </div>
            );
          },
        )}
      </div>
    );
  },
);

Toolbar.displayName = 'Toolbar';

export { Toolbar };
