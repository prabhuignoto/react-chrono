import { TimelineItemModel } from '@models/TimelineItemModel';
import { TimelineProps } from '@models/TimelineModel';
import { TimelinePropsV2 } from '@models/TimelinePropsV2';
import { migrateLegacyProps, warnDeprecatedProps } from '@utils/propMigration';
import { getUniqueID } from '@utils/index';
import { safeValidateTimelineProps } from '@utils/validation';
import dayjs from 'dayjs';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { TimelineContextProvider } from './contexts/TimelineContextProvider';
import Timeline from './timeline/timeline';
import { computeCssVarsFromTheme } from '../styles/theme-bridge';
import { lightThemeClass, darkThemeClass } from '../styles/themes.css';
import { pickDefined } from '../utils/propUtils';
import { TimelineErrorBoundary } from './common/error-boundary';
const toReactArray = React.Children.toArray;

/**
 * Converts new grouped props back to legacy format for internal compatibility
 */
function convertToLegacyProps(props: TimelinePropsV2): TimelineProps {
  return pickDefined({
    // Core props
    items: props.items,
    children: props.children,
    theme: props.theme,
    activeItemIndex: props.activeItemIndex,
    allowDynamicUpdate: props.allowDynamicUpdate,
    uniqueId: props.id,
    onItemSelected: props.onItemSelected
      ? (data: any) => {
          // Convert from legacy flat structure to new nested structure
          if ('item' in data) {
            // Already in new format
            props.onItemSelected!(data);
          } else {
            // Convert from legacy format
            const { index, ...item } = data;
            props.onItemSelected!({ item, index });
          }
        }
      : undefined,
    onScrollEnd: props.onScrollEnd,
    onThemeChange: props.onThemeChange as any,
    onRestartSlideshow: props.onRestartSlideshow,

    // Mode conversion
    mode: mapNewModeToLegacy(props.mode),

    // Layout props
    cardWidth: props.layout?.cardWidth,
    cardHeight: props.layout?.cardHeight,
    timelinePointDimension: props.layout?.pointSize,
    lineWidth: props.layout?.lineWidth,
    itemWidth: props.layout?.itemWidth,
    timelineHeight: props.layout?.timelineHeight,
    responsiveBreakPoint: props.layout?.responsive?.breakpoint,
    enableBreakPoint: props.layout?.responsive?.enabled,
    cardPositionHorizontal: mapNewCardPositionToLegacy(
      props.layout?.positioning?.cardPosition,
    ),
    flipLayout: props.layout?.positioning?.flipLayout,

    // Interaction props
    disableNavOnKey:
      props.interaction?.keyboardNavigation === false ? true : undefined,
    disableClickOnCircle:
      props.interaction?.pointClick === false ? true : undefined,
    disableAutoScrollOnClick:
      props.interaction?.autoScroll === false ? true : undefined,
    focusActiveItemOnLoad: props.interaction?.focusOnLoad,
    highlightCardsOnHover: props.interaction?.cardHover,
    disableInteraction: props.interaction?.disabled,

    // Content props
    parseDetailsAsHTML: props.content?.allowHTML,
    useReadMore: props.content?.readMore,
    textOverlay: props.content?.textOverlay,
    titleDateFormat: props.content?.dateFormat,
    textDensity: props.content?.compactText ? 'LOW' : 'HIGH',
    semanticTags: props.content?.semanticTags
      ? pickDefined({
          cardTitle: props.content.semanticTags.title,
          cardSubtitle: props.content.semanticTags.subtitle,
        })
      : undefined,
    contentAlignment: props.content?.alignment
      ? {
          horizontal: props.content.alignment.horizontal || 'left',
          vertical: props.content.alignment.vertical || 'top',
        }
      : { horizontal: 'left' as const, vertical: 'top' as const },

    // Display props
    borderLessCards: props.display?.borderless,
    cardLess: props.display?.cardsDisabled,
    disableTimelinePoint: props.display?.pointsDisabled,
    timelinePointShape: props.display?.pointShape,
    showAllCardsHorizontal: props.display?.allCardsVisible,
    disableToolbar:
      props.display?.toolbar?.enabled === false ? true : undefined,
    toolbarPosition: props.display?.toolbar?.position,
    toolbarSearchConfig: props.display?.toolbar?.search,
    scrollable: props.display?.scrollable,

    // Media props
    mediaHeight: props.media?.height,
    mediaSettings: props.media
      ? pickDefined({
          align: props.media?.align,
          fit: props.media?.fit as
            | 'cover'
            | 'contain'
            | 'fill'
            | 'none'
            | undefined,
        })
      : undefined,

    // Animation props
    slideShow: props.animation?.slideshow?.enabled,
    slideItemDuration: props.animation?.slideshow?.duration,
    slideShowType: mapNewSlideshowTypeToLegacy(
      props.animation?.slideshow?.type,
    ) as any,
    showProgressOnSlideshow: props.animation?.slideshow?.showProgress,
    showOverallSlideshowProgress:
      props.animation?.slideshow?.showOverallProgress,

    // Style props
    classNames: props.style?.classNames,
    fontSizes: props.style?.fontSizes,
    googleFonts: props.style?.googleFonts,

    // Accessibility props
    buttonTexts: props.accessibility?.buttonTexts as any,

    // i18n props
    i18nConfig: props.i18n?.texts,

    // Dark mode
    darkMode: props.darkMode?.enabled,
    enableDarkToggle: props.darkMode?.showToggle,
  }) as TimelineProps;
}

function mapNewModeToLegacy(mode?: TimelinePropsV2['mode']): string {
  switch (mode) {
    case 'horizontal':
      return 'HORIZONTAL';
    case 'vertical':
      return 'VERTICAL';
    case 'alternating':
      return 'VERTICAL_ALTERNATING';
    case 'horizontal-all':
      return 'HORIZONTAL_ALL';
    default:
      return 'VERTICAL_ALTERNATING';
  }
}

function mapNewCardPositionToLegacy(
  position?: 'top' | 'bottom',
): 'TOP' | 'BOTTOM' | undefined {
  switch (position) {
    case 'top':
      return 'TOP';
    case 'bottom':
      return 'BOTTOM';
    default:
      return undefined;
  }
}

function mapNewSlideshowTypeToLegacy(
  type?: 'reveal' | 'slide' | 'fade',
): string | undefined {
  switch (type) {
    case 'reveal':
      return 'reveal';
    case 'slide':
      return 'slide_in';
    case 'fade':
      return 'slide_from_sides';
    default:
      return undefined;
  }
}

// Union type to accept both old and new prop formats
type ChronoProps = TimelineProps | TimelinePropsV2;

const Chrono: React.FunctionComponent<ChronoProps> = (
  inputProps: ChronoProps,
) => {
  // Handle backward compatibility and migration
  const props = useMemo(() => {
    // Check if using new grouped prop structure
    const hasNewProps =
      'layout' in inputProps ||
      'interaction' in inputProps ||
      'content' in inputProps ||
      'display' in inputProps ||
      'media' in inputProps ||
      'animation' in inputProps;

    if (hasNewProps) {
      // Already using new format
      return inputProps as TimelinePropsV2;
    } else {
      // Migrate legacy props and warn about deprecations
      if (process.env.NODE_ENV === 'development') {
        warnDeprecatedProps(inputProps as TimelineProps);
      }
      return migrateLegacyProps(inputProps as TimelineProps);
    }
  }, [inputProps]);

  // Validate props early with development warnings
  if (process.env.NODE_ENV === 'development') {
    // Convert back to legacy format for existing validation
    const legacyProps = convertToLegacyProps(props);
    const validationResult = safeValidateTimelineProps(legacyProps);
    if (!validationResult.success) {
      console.warn(
        'Timeline props validation warnings:',
        validationResult.errors
          .map((error) => `${error.path.join('.')}: ${error.message}`)
          .join(', '),
      );
    }
  }

  // Extract props with new grouped structure
  const {
    allowDynamicUpdate = false,
    children,
    items = [],
    onScrollEnd,
    activeItemIndex,
    mode = 'alternating',
    onThemeChange,
    onRestartSlideshow,
    content,
    animation,
  } = props;

  // Extract specific values from grouped configs with defaults
  const slideShow = animation?.slideshow?.enabled || false;
  const slideItemDuration = animation?.slideshow?.duration || 2000;
  const titleDateFormat = content?.dateFormat || 'MMM DD, YYYY';

  const [timeLineItems, setTimeLineItems] = useState<TimelineItemModel[]>([]);
  const timeLineItemsRef = useRef<TimelineItemModel[]>([]);
  const [slideShowActive, setSlideShowActive] = useState(false);
  // Don't auto-highlight first item in vertical modes unless explicitly set
  const [activeTimelineItem, setActiveTimelineItem] = useState(
    activeItemIndex !== undefined
      ? activeItemIndex
      : mode === 'vertical' || mode === 'alternating'
        ? undefined
        : 0,
  );

  // Track the previous prop value to avoid circular updates
  const previousActiveItemIndexRef = useRef(activeItemIndex);

  // Cache the last processed items to avoid unnecessary reprocessing
  const itemsHashRef = useRef<string>('');
  const processedItemsCache = useRef<TimelineItemModel[]>([]);
  
  // Store the last original items array for comparison (to detect append vs replace)
  const lastOriginalItemsRef = useRef<any[]>([]);
  
  // Store scroll position to preserve it during item updates
  const scrollPositionRef = useRef<{ scrollLeft?: number; scrollTop?: number }>({});

  // Track children count for Array.map() pattern detection
  const childrenCount = React.Children.count(children);

  // Memoize the initItems function
  const initItems = useCallback(
    (lineItems?: TimelineItemModel[]): TimelineItemModel[] => {
      if (lineItems?.length) {
        return lineItems.map((item, index) => {
          const id = getUniqueID();
          const hasNestedItems = !!item.items?.length;

          return {
            ...item,
            _dayjs: dayjs(item.date),
            active: activeItemIndex !== undefined && index === activeItemIndex,
            id,
            hasNestedItems,
            items:
              item.items?.map((subItem) => ({
                ...subItem,
                _dayjs: dayjs(subItem.date),
                id: getUniqueID(),
                isNested: true,
                visible: true,
              })) || [],
            title: item.date
              ? dayjs(item.date).format(titleDateFormat)
              : item.title,
            visible: true,
          };
        });
      }

      const itemLength = React.Children.toArray(children).filter(
        (item) =>
          (item as React.ReactElement<any>).props.className !== 'chrono-icons',
      ).length;

      return Array.from({ length: itemLength }).map((_, index) => ({
        active: index === activeItemIndex,
        id: getUniqueID(),
        visible: true,
      }));
    },
    [activeItemIndex, titleDateFormat, children],
  );

  // Optimize updateItems function - only for truly appending items
  // This function merges existing items with new ones, preserving existing item states
  const updateItems = useCallback(
    (lineItems: TimelineItemModel[], existingItems: TimelineItemModel[]) => {
      if (lineItems && existingItems.length > 0) {
        // Merge existing items with new ones, preserving existing item states
        const existingItemsMap = new Map(
          existingItems.map((item, idx) => [idx, item])
        );
        
        return lineItems.map((item, index) => {
          // If this is an existing item, preserve its state
          const existingItem = existingItemsMap.get(index);
          if (existingItem) {
            return {
              ...item,
              ...(existingItem.id !== undefined && { id: existingItem.id }),
              ...(existingItem.active !== undefined && { active: existingItem.active }),
              ...(existingItem.visible !== undefined && { visible: existingItem.visible }),
            };
          }
          // New item - set visible and inactive (active will be set by active item logic)
          return {
            ...item,
            active: false,
            visible: true,
          };
        });
      } else {
        return [];
      }
    },
    [], // No dependencies - function is pure
  );

  // Helper function to convert ReactNode to hashable string
  const getHashableValue = useCallback((value: any, itemId: string): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    
    // For ReactNode, use a stable identifier
    // If it's a React element, try to get a stable key
    if (React.isValidElement(value)) {
      const key = value.key;
      const type = typeof value.type === 'string' 
        ? value.type 
        : value.type?.name || 'Component';
      return `[ReactNode:${type}${key ? `:${key}` : ''}]`;
    }
    
    // For other ReactNode types (arrays, fragments, etc.), use item id as fallback
    return `[ReactNode:${itemId}]`;
  }, []);

  // Create a stable hash for items comparison - optimized version
  const createItemsHash = useCallback((items: any[]) => {
    if (!items?.length) return '';

    // Only extract the needed properties and create a single string
    return items
      .map((item) => {
        // Use simple string concatenation which is more efficient than JSON.stringify
        const id = item.id || '';
        const date = item.date || '';
        const title = getHashableValue(item.title, id);
        const cardTitle = getHashableValue(item.cardTitle, id);
        return `${id}:${date}:${title}:${cardTitle}`;
      })
      .join('|');
  }, [getHashableValue]);

  useEffect(() => {
    const _items = items?.filter((item) => item);
    let newItems: TimelineItemModel[] = [];

    // FIX for Issue #291: Handle children pattern (Array.map())
    // When items array is not provided but children exist, track children count changes
    if (!_items?.length && children) {
      const currentChildrenHash = String(childrenCount);

      // Check if children count changed or if dynamic updates are allowed
      if (allowDynamicUpdate || currentChildrenHash !== itemsHashRef.current) {
        itemsHashRef.current = currentChildrenHash;
        const lineItems = initItems();
        setTimeLineItems(lineItems);

        // For dynamic updates via children, focus on first new item if no active item
        if (allowDynamicUpdate && timeLineItems.length > 0 && lineItems.length > timeLineItems.length) {
          if (activeTimelineItem === undefined || activeTimelineItem === null) {
            setActiveTimelineItem(timeLineItems.length);
          }
        }
      }
      return;
    }

    if (!_items?.length) {
      const lineItems = initItems();
      setTimeLineItems(lineItems);
      lastOriginalItemsRef.current = [];
      return;
    }

    // Use efficient comparison instead of JSON.stringify on entire array
    const currentHash = createItemsHash(_items);

    // Check if hash has changed - if not, skip processing (even with allowDynamicUpdate)
    // This prevents unnecessary re-renders when only active state changes
    if (currentHash === itemsHashRef.current) {
      return; // No changes to items data, skip processing
    }

    // Capture scroll position before items update (for horizontal/vertical modes)
    const timelineElement = document.querySelector(
      '[data-testid="timeline-main-wrapper"]'
    ) as HTMLElement | null;
    
    if (timelineElement) {
      scrollPositionRef.current = {
        scrollLeft: timelineElement.scrollLeft,
        scrollTop: timelineElement.scrollTop,
      };
    }

    itemsHashRef.current = currentHash;

    const previousItemsLength = timeLineItems.length;
    
    // Check if items are truly appended (same items + new ones at end) vs replaced (completely different)
    // Compare first N items (where N = previous length) to see if they match
    const isTrulyAppended = allowDynamicUpdate && 
      timeLineItems.length > 0 && 
      _items.length > timeLineItems.length &&
      lastOriginalItemsRef.current.length > 0 &&
      // Verify existing items are preserved at the beginning by comparing original items
      (() => {
        const previousOriginalSlice = lastOriginalItemsRef.current;
        const newItemsSlice = _items.slice(0, previousOriginalSlice.length);
        
        // Compare by hash (which uses id, date, title, cardTitle from original items)
        const previousHash = createItemsHash(previousOriginalSlice);
        const newHash = createItemsHash(newItemsSlice);
        return previousHash === newHash && previousHash !== '';
      })();

    if (isTrulyAppended) {
      // Items are truly appended - use updateItems to merge
      newItems = updateItems(_items, timeLineItems);
    } else if (_items.length) {
      // Items are replaced or initial load - use initItems
      newItems = initItems(_items);
    }

    if (newItems.length) {
      timeLineItemsRef.current = newItems;
      setTimeLineItems(newItems);

      // Validate and clamp activeTimelineItem to valid range
      let validActiveIndex: number | undefined;
      if (isTrulyAppended && allowDynamicUpdate && previousItemsLength > 0) {
        // For truly appended items, preserve current active item if valid
        if (activeTimelineItem !== undefined && activeTimelineItem !== null) {
          validActiveIndex = Math.min(activeTimelineItem, newItems.length - 1);
        } else {
          // No active item - focus on first newly loaded item
          validActiveIndex = previousItemsLength;
        }
      } else {
        // For replaced items or initial load, respect the initial activeItemIndex setting
        const initialIndex =
          activeItemIndex !== undefined
            ? activeItemIndex
            : mode === 'vertical' || mode === 'alternating'
              ? undefined
              : 0;
        validActiveIndex = initialIndex !== undefined 
          ? Math.min(initialIndex, newItems.length - 1)
          : undefined;
      }

      // Ensure validActiveIndex is within bounds
      if (validActiveIndex !== undefined && validActiveIndex < 0) {
        validActiveIndex = 0;
      }

      setActiveTimelineItem(validActiveIndex);

      // Restore scroll position after DOM update
      if (timelineElement && (scrollPositionRef.current.scrollLeft !== undefined || scrollPositionRef.current.scrollTop !== undefined)) {
        requestAnimationFrame(() => {
          const updatedElement = document.querySelector(
            '[data-testid="timeline-main-wrapper"]'
          ) as HTMLElement | null;
          
          if (updatedElement) {
            const mappedMode = mapNewModeToLegacy(mode);
            // For horizontal mode, preserve scrollLeft (clamped to valid range)
            if (scrollPositionRef.current.scrollLeft !== undefined && 
                (mappedMode === 'HORIZONTAL' || mappedMode === 'HORIZONTAL_ALL')) {
              const maxScrollLeft = updatedElement.scrollWidth - updatedElement.clientWidth;
              updatedElement.scrollLeft = Math.max(
                0, 
                Math.min(scrollPositionRef.current.scrollLeft, maxScrollLeft)
              );
            }
            // For vertical modes, preserve scrollTop (clamped to valid range)
            if (scrollPositionRef.current.scrollTop !== undefined && 
                (mappedMode === 'VERTICAL' || mappedMode === 'VERTICAL_ALTERNATING')) {
              const maxScrollTop = updatedElement.scrollHeight - updatedElement.clientHeight;
              updatedElement.scrollTop = Math.max(
                0, 
                Math.min(scrollPositionRef.current.scrollTop, maxScrollTop)
              );
            }
          }
        });
      }

      processedItemsCache.current = newItems;
      
      // Store the original items for next comparison
      lastOriginalItemsRef.current = _items;
    }
  }, [
    items,
    children,
    childrenCount,
    allowDynamicUpdate,
    timeLineItems.length,
    initItems,
    updateItems,
    createItemsHash,
    activeTimelineItem,
    mode,
    activeItemIndex,
  ]);

  const handleTimelineUpdate = useCallback(
    (actvTimelineIndex: number) => {
      setTimeLineItems((lineItems) =>
        lineItems.map((item, index) => ({
          ...item,
          active: index === actvTimelineIndex,
          // Always keep horizontal items visible so points are always shown
          visible: true,
        })),
      );

      setActiveTimelineItem(actvTimelineIndex);

      if (items) {
        if (items.length - 1 === actvTimelineIndex) {
          setSlideShowActive(false);
        }
      }
    },
    [items, mode],
  );

  useEffect(() => {
    // Only update if the activeItemIndex prop has actually changed from its previous value
    // This prevents unwanted resets during dynamic loading and circular updates
    if (activeItemIndex !== previousActiveItemIndexRef.current) {
      previousActiveItemIndexRef.current = activeItemIndex;
      if (activeItemIndex !== undefined) {
        handleTimelineUpdate(activeItemIndex);
      }
    }
  }, [activeItemIndex, handleTimelineUpdate]);

  const restartSlideShow = useCallback(() => {
    handleTimelineUpdate(-1);

    setTimeout(() => {
      setSlideShowActive(true);
      handleTimelineUpdate(0);
    }, 0);
  }, [handleTimelineUpdate]);

  // Only sync slideshow state when slideShow prop changes, don't auto-start
  useEffect(() => {
    if (!slideShow) {
      setSlideShowActive(false);
    }
    // Note: slideshow should be started manually by user interaction, not auto-started
  }, [slideShow]);

  const handleOnNext = useCallback(() => {
    if (!timeLineItems.length) {
      return;
    }
    if (
      activeTimelineItem !== undefined &&
      activeTimelineItem < timeLineItems.length - 1
    ) {
      const newTimeLineItem = activeTimelineItem + 1;

      // Update timeline state and trigger smooth navigation
      handleTimelineUpdate(newTimeLineItem);
      setActiveTimelineItem(newTimeLineItem);

      if (
        mapNewModeToLegacy(mode) === 'HORIZONTAL' &&
        slideShowActive &&
        items &&
        items.length - 1 === newTimeLineItem
      ) {
        setSlideShowActive(false);
      }
    }
  }, [
    timeLineItems.length,
    activeTimelineItem,
    handleTimelineUpdate,
    mode,
    slideShowActive,
    items,
  ]);

  const handleOnPrevious = useCallback(() => {
    if (activeTimelineItem !== undefined && activeTimelineItem > 0) {
      const newTimeLineItem = activeTimelineItem - 1;

      // Update timeline state and trigger smooth navigation
      handleTimelineUpdate(newTimeLineItem);
      setActiveTimelineItem(newTimeLineItem);
    }
  }, [activeTimelineItem, handleTimelineUpdate]);

  const handleFirst = useCallback(() => {
    setActiveTimelineItem(0);
    handleTimelineUpdate(0);
  }, [handleTimelineUpdate]);

  const handleLast = useCallback(() => {
    if (timeLineItems.length) {
      const idx = timeLineItems.length - 1;
      setActiveTimelineItem(idx);
      handleTimelineUpdate(idx);
    }
  }, [timeLineItems.length, handleTimelineUpdate]);

  const handleOutlineSelection = useCallback(
    (index: number) => {
      if (index >= 0) {
        setActiveTimelineItem(index);
        handleTimelineUpdate(index);
      }
    },
    [handleTimelineUpdate],
  );

  const onPaused = useCallback(() => {
    setSlideShowActive(false);
  }, []);

  // Memoize icon children processing
  const iconChildren = useMemo(() => {
    let iconChildArray = toReactArray(children).filter(
      (item) =>
        item &&
        (item as any).props &&
        (item as any).props.className === 'chrono-icons',
    );

    if (iconChildArray.length) {
      return (iconChildArray[0] as any).props.children;
    }
    return iconChildArray;
  }, [children]);

  // Memoize content details children
  const contentDetailsChildren = useMemo(() => {
    return toReactArray(children).filter(
      (item) =>
        item &&
        (item as any).props &&
        (item as any).props.className !== 'chrono-icons',
    );
  }, [children]);

  // Determine if we should use dark mode based on theme properties
  const isDarkMode = useMemo(() => {
    const t = props.theme;
    return (
      t?.timelineBgColor === '#000000' ||
      t?.cardBgColor === '#1f2937' ||
      t?.textColor === '#ffffff' ||
      t?.textColor === '#f9fafb'
    );
  }, [props.theme]);

  // Convert to legacy props for internal compatibility
  const legacyProps = useMemo(() => convertToLegacyProps(props), [props]);

  return (
    <TimelineErrorBoundary>
      <TimelineContextProvider {...legacyProps}>
        <div
          className={isDarkMode ? darkThemeClass : lightThemeClass}
          style={{ ...computeCssVarsFromTheme(props.theme), width: '100%' }}
          id="testette"
        >
          <Timeline
            activeTimelineItem={activeTimelineItem || 0}
            contentDetailsChildren={contentDetailsChildren}
            iconChildren={iconChildren}
            items={timeLineItems}
            onFirst={handleFirst}
            onLast={handleLast}
            onNext={handleOnNext}
            onPrevious={handleOnPrevious}
            onRestartSlideshow={restartSlideShow}
            onTimelineUpdated={handleTimelineUpdate}
            slideShow={slideShow}
            slideShowEnabled={slideShow}
            slideShowRunning={slideShowActive}
            slideItemDuration={slideItemDuration}
            {...pickDefined({
              onScrollEnd,
              onItemSelected: legacyProps.onItemSelected,
            })}
            onOutlineSelection={handleOutlineSelection}
            mode={mapNewModeToLegacy(mode)}
            onPaused={onPaused}
          />
        </div>
      </TimelineContextProvider>
    </TimelineErrorBoundary>
  );
};

export default React.memo(Chrono);
