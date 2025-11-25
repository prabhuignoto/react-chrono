import React, {
  FunctionComponent,
  ReactNode,
  memo,
  useMemo,
  useRef,
} from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';
// Using Vanilla Extract CSS classes instead of styled-components
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
  toolbarWrapper as veToolbarWrapper,
  toolbarIconButton,
} from './toolbar.css';
import { useRovingTabIndex } from '@hooks/accessibility';
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

    // Create toolbar items for roving tabindex pattern
    // WCAG 2.4.3: Focus Order - Toolbar with roving tabindex
    const toolbarItems = useMemo(
      () =>
        items.map((item, index) => ({
          id: item.id || String(index),
          disabled: false,
        })),
      [items],
    );

    const { getItemProps, activeId } = useRovingTabIndex({
      items: toolbarItems,
      orientation: 'horizontal',
      loop: false,
    });

    return (
      <div
        className={veToolbarWrapper()}
        role={hasNestedToolbarRole ? undefined : 'toolbar'}
        aria-label={hasNestedToolbarRole ? undefined : 'Timeline controls'}
        aria-orientation={hasNestedToolbarRole ? undefined : 'horizontal'}
        aria-keyshortcuts="ArrowLeft ArrowRight Home End"
        style={style}
        {...rest}
      >
        {items.map(
          (
            {
              label,
              id,
              icon,
              minimizable,
              isMinimized,
              onToggleMinimize,
              name,
              onSelect,
            },
            index,
          ) => {
            if (!id) {
              console.warn('Toolbar item is missing required id property');
              return null;
            }

            const contentId = `toolbar-content-${id}`;

            const handleMinimizeToggle = () => {
              if (onToggleMinimize && minimizable) {
                onToggleMinimize(id, !isMinimized);
              }
            };

            const handleItemClick = () => {
              if (onSelect && name) {
                onSelect(id, name);
              }
            };

            const itemProps = getItemProps(id);
            const { ref, ...otherProps } = itemProps;

            return (
              <div className={veToolbarListItem} key={id} role="group">
                <button
                  {...otherProps}
                  ref={ref as React.RefObject<HTMLButtonElement>}
                  className={toolbarIconButton()}
                  onClick={handleItemClick}
                  aria-label={label || name}
                  type="button"
                  title={label || name}
                >
                  {icon && <span className={veIconWrapper}>{icon}</span>}
                </button>
                {minimizable && (
                  <button
                    className={toolbarIconButton({
                      state: isMinimized ? 'minimized' : 'active',
                    })}
                    onClick={handleMinimizeToggle}
                    aria-label={
                      isMinimized ? `Maximize ${label}` : `Minimize ${label}`
                    }
                    aria-controls={contentId}
                    aria-expanded={!isMinimized}
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
                    <span className={veContentWrapper} id={contentId}>
                      {(children as ReactNode[])[index]}
                    </span>
                  )}
                {!isMinimized &&
                  !Array.isArray(children) &&
                  index === 0 &&
                  children && (
                    <span className={veContentWrapper} id={contentId}>
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
