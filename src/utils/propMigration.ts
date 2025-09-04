/**
 * Backward compatibility utilities for migrating from old to new prop structure
 */

import {
  TimelinePropsV2,
  LegacyTimelineProps,
} from '../models/TimelinePropsV2';
import { TimelineProps } from '../models/TimelineModel';

/**
 * Maps legacy props to new grouped structure
 */
export function migrateLegacyProps(
  legacyProps: TimelineProps,
): TimelinePropsV2 {
  const newProps: any = {
    // Core props remain the same
    items: legacyProps.items || [],
    mode: mapLegacyMode(legacyProps.mode),
    children: legacyProps.children,
    theme: legacyProps.theme,
    activeItemIndex: legacyProps.activeItemIndex,
    allowDynamicUpdate: legacyProps.allowDynamicUpdate,
    id: legacyProps.uniqueId,
    onItemSelected: legacyProps.onItemSelected,
    onScrollEnd: legacyProps.onScrollEnd,
    onThemeChange: legacyProps.onThemeChange,
    onRestartSlideshow: legacyProps.onRestartSlideshow,
  };

  // Layout configuration
  if (hasLayoutProps(legacyProps)) {
    newProps.layout = {
      cardWidth: legacyProps.cardWidth,
      cardHeight: legacyProps.cardHeight,
      pointSize: legacyProps.timelinePointDimension,
      lineWidth: legacyProps.lineWidth,
      itemWidth: legacyProps.itemWidth,
      responsive:
        legacyProps.responsiveBreakPoint !== undefined ||
        legacyProps.enableBreakPoint !== undefined
          ? {
              ...(legacyProps.responsiveBreakPoint !== undefined && {
                breakpoint: legacyProps.responsiveBreakPoint,
              }),
              ...(legacyProps.enableBreakPoint !== undefined && {
                enabled: legacyProps.enableBreakPoint,
              }),
            }
          : undefined,
      positioning:
        mapLegacyCardPosition(legacyProps.cardPositionHorizontal) !==
          undefined || legacyProps.flipLayout !== undefined
          ? {
              ...(mapLegacyCardPosition(legacyProps.cardPositionHorizontal) !==
                undefined && {
                cardPosition: mapLegacyCardPosition(
                  legacyProps.cardPositionHorizontal,
                ),
              }),
              ...(legacyProps.flipLayout !== undefined && {
                flipLayout: legacyProps.flipLayout,
              }),
            }
          : undefined,
      timelineHeight: legacyProps.timelineHeight,
    };
  }

  // Interaction configuration
  if (hasInteractionProps(legacyProps)) {
    newProps.interaction = {
      ...(legacyProps.disableNavOnKey === true && {
        keyboardNavigation: false,
      }),
      ...(legacyProps.disableClickOnCircle === true && { pointClick: false }),
      ...(legacyProps.disableAutoScrollOnClick === true && {
        autoScroll: false,
      }),
      ...(legacyProps.focusActiveItemOnLoad !== undefined && {
        focusOnLoad: legacyProps.focusActiveItemOnLoad,
      }),
      ...(legacyProps.highlightCardsOnHover !== undefined && {
        cardHover: legacyProps.highlightCardsOnHover,
      }),
      ...(legacyProps.disableInteraction !== undefined && {
        disabled: legacyProps.disableInteraction,
      }),
    };
  }

  // Content configuration
  if (hasContentProps(legacyProps)) {
    newProps.content = {
      allowHTML: legacyProps.parseDetailsAsHTML,
      readMore: legacyProps.useReadMore,
      textOverlay: legacyProps.textOverlay,
      dateFormat: legacyProps.titleDateFormat,
      compactText: legacyProps.textDensity === 'HIGH',
      semanticTags: legacyProps.semanticTags
        ? {
            ...(legacyProps.semanticTags.cardTitle && {
              title: legacyProps.semanticTags.cardTitle,
            }),
            ...(legacyProps.semanticTags.cardSubtitle && {
              subtitle: legacyProps.semanticTags.cardSubtitle,
            }),
          }
        : undefined,
    };
  }

  // Display configuration
  if (hasDisplayProps(legacyProps)) {
    newProps.display = {
      borderless: legacyProps.borderLessCards,
      cardsDisabled: legacyProps.cardLess,
      pointsDisabled: legacyProps.disableTimelinePoint,
      pointShape: legacyProps.timelinePointShape,
      allCardsVisible: legacyProps.showAllCardsHorizontal,
      toolbar:
        legacyProps.disableToolbar === true ||
        legacyProps.toolbarPosition !== undefined
          ? {
              ...(legacyProps.disableToolbar === true && { enabled: false }),
              ...(legacyProps.toolbarPosition !== undefined && {
                position: legacyProps.toolbarPosition,
              }),
            }
          : undefined,
      scrollable: legacyProps.scrollable,
    };
  }

  // Media configuration
  if (hasMediaProps(legacyProps)) {
    newProps.media = {
      ...(legacyProps.mediaHeight !== undefined && {
        height: legacyProps.mediaHeight,
      }),
      ...(legacyProps.mediaSettings?.align !== undefined && {
        align: legacyProps.mediaSettings.align,
      }),
      ...(legacyProps.mediaSettings?.fit !== undefined && {
        fit: legacyProps.mediaSettings.fit,
      }),
    };
  }

  // Animation configuration
  if (hasAnimationProps(legacyProps)) {
    newProps.animation = {
      slideshow: {
        ...(legacyProps.slideShow !== undefined && {
          enabled: legacyProps.slideShow,
        }),
        ...(legacyProps.slideItemDuration !== undefined && {
          duration: legacyProps.slideItemDuration,
        }),
        ...(legacyProps.slideShowType !== undefined && {
          type: mapLegacySlideshowType(legacyProps.slideShowType),
        }),
        ...(legacyProps.showProgressOnSlideshow !== undefined && {
          showProgress: legacyProps.showProgressOnSlideshow,
        }),
        ...(legacyProps.showOverallSlideshowProgress !== undefined && {
          showOverallProgress: legacyProps.showOverallSlideshowProgress,
        }),
      },
    };
  }

  // Style configuration
  if (hasStyleProps(legacyProps)) {
    newProps.style = {
      ...(legacyProps.classNames !== undefined && {
        classNames: legacyProps.classNames,
      }),
      ...(legacyProps.fontSizes !== undefined && {
        fontSizes: legacyProps.fontSizes,
      }),
    };
  }

  // Accessibility configuration
  if (hasAccessibilityProps(legacyProps)) {
    newProps.accessibility = {
      ...(legacyProps.buttonTexts !== undefined && {
        buttonTexts: legacyProps.buttonTexts,
      }),
    };
  }

  // Dark mode configuration
  if (
    legacyProps.darkMode !== undefined ||
    legacyProps.enableDarkToggle !== undefined
  ) {
    newProps.darkMode = {
      ...(legacyProps.darkMode !== undefined && {
        enabled: legacyProps.darkMode,
      }),
      ...(legacyProps.enableDarkToggle !== undefined && {
        showToggle: legacyProps.enableDarkToggle,
      }),
    };
  }

  return newProps as TimelinePropsV2;
}

/**
 * Issues deprecation warnings for legacy props
 */
export function warnDeprecatedProps(props: TimelineProps): void {
  const deprecationWarnings: string[] = [];

  // Check for deprecated layout props
  if (props.timelinePointDimension !== undefined) {
    deprecationWarnings.push(
      'timelinePointDimension is deprecated. Use layout.pointSize instead.',
    );
  }
  if (props.cardPositionHorizontal !== undefined) {
    deprecationWarnings.push(
      'cardPositionHorizontal is deprecated. Use layout.positioning.cardPosition instead.',
    );
  }

  // Check for deprecated interaction props
  if (props.disableNavOnKey !== undefined) {
    deprecationWarnings.push(
      'disableNavOnKey is deprecated. Use interaction.keyboardNavigation instead.',
    );
  }
  if (props.disableClickOnCircle !== undefined) {
    deprecationWarnings.push(
      'disableClickOnCircle is deprecated. Use interaction.pointClick instead.',
    );
  }
  if (props.disableAutoScrollOnClick !== undefined) {
    deprecationWarnings.push(
      'disableAutoScrollOnClick is deprecated. Use interaction.autoScroll instead.',
    );
  }

  // Check for deprecated content props
  if (props.parseDetailsAsHTML !== undefined) {
    deprecationWarnings.push(
      'parseDetailsAsHTML is deprecated. Use content.allowHTML instead.',
    );
  }
  if (props.textDensity !== undefined) {
    deprecationWarnings.push(
      'textDensity is deprecated. Use content.compactText instead.',
    );
  }

  // Check for deprecated display props
  if (props.borderLessCards !== undefined) {
    deprecationWarnings.push(
      'borderLessCards is deprecated. Use display.borderless instead.',
    );
  }
  if (props.cardLess !== undefined) {
    deprecationWarnings.push(
      'cardLess is deprecated. Use display.cardsDisabled instead.',
    );
  }
  if (props.showAllCardsHorizontal !== undefined) {
    deprecationWarnings.push(
      'showAllCardsHorizontal is deprecated. Use display.allCardsVisible instead.',
    );
  }

  // Check for removed props
  if (props.noUniqueId !== undefined) {
    deprecationWarnings.push(
      'noUniqueId is deprecated and no longer needed. Use the id prop if you need custom IDs.',
    );
  }
  if (props.isChild !== undefined) {
    deprecationWarnings.push(
      'isChild is an internal prop and should not be used directly.',
    );
  }

  // Log warnings in development
  if (
    process.env.NODE_ENV === 'development' &&
    deprecationWarnings.length > 0
  ) {
    console.warn(
      'React Chrono: Deprecated props detected. Please migrate to the new grouped prop structure:\n' +
        deprecationWarnings.map((warning) => `  • ${warning}`).join('\n') +
        '\n\nFor migration guide, visit: https://github.com/prabhuignoto/react-chrono/blob/master/MIGRATION.md',
    );
  }
}

// Helper functions for prop detection

function hasLayoutProps(props: TimelineProps): boolean {
  return !!(
    props.cardWidth ||
    props.cardHeight ||
    props.timelinePointDimension ||
    props.lineWidth ||
    props.itemWidth ||
    props.responsiveBreakPoint ||
    props.enableBreakPoint ||
    props.cardPositionHorizontal ||
    props.flipLayout
  );
}

function hasInteractionProps(props: TimelineProps): boolean {
  return !!(
    props.disableNavOnKey !== undefined ||
    props.disableClickOnCircle !== undefined ||
    props.disableAutoScrollOnClick !== undefined ||
    props.focusActiveItemOnLoad !== undefined ||
    props.highlightCardsOnHover !== undefined ||
    props.disableInteraction !== undefined
  );
}

function hasContentProps(props: TimelineProps): boolean {
  return !!(
    props.parseDetailsAsHTML !== undefined ||
    props.useReadMore !== undefined ||
    props.textOverlay !== undefined ||
    props.titleDateFormat ||
    props.textDensity ||
    props.semanticTags
  );
}

function hasDisplayProps(props: TimelineProps): boolean {
  return !!(
    props.borderLessCards !== undefined ||
    props.cardLess !== undefined ||
    props.disableTimelinePoint !== undefined ||
    props.timelinePointShape ||
    props.showAllCardsHorizontal !== undefined ||
    props.disableToolbar !== undefined ||
    props.toolbarPosition ||
    props.scrollable !== undefined
  );
}

function hasMediaProps(props: TimelineProps): boolean {
  return !!(props.mediaHeight || props.mediaSettings);
}

function hasAnimationProps(props: TimelineProps): boolean {
  return !!(
    props.slideShow !== undefined ||
    props.slideItemDuration ||
    props.slideShowType ||
    props.showProgressOnSlideshow !== undefined ||
    props.showOverallSlideshowProgress !== undefined
  );
}

function hasStyleProps(props: TimelineProps): boolean {
  return !!(props.classNames || props.fontSizes);
}

function hasAccessibilityProps(props: TimelineProps): boolean {
  return !!props.buttonTexts;
}

// Mapping functions

function mapLegacyMode(mode?: string): TimelinePropsV2['mode'] {
  switch (mode) {
    case 'VERTICAL':
      return 'vertical';
    case 'HORIZONTAL':
      return 'horizontal';
    case 'VERTICAL_ALTERNATING':
      return 'alternating';
    case 'HORIZONTAL_ALL':
      return 'horizontal-all';
    default:
      return 'alternating'; // Default mode
  }
}

function mapLegacyCardPosition(
  position?: 'TOP' | 'BOTTOM',
): 'top' | 'bottom' | undefined {
  switch (position) {
    case 'TOP':
      return 'top';
    case 'BOTTOM':
      return 'bottom';
    default:
      return undefined;
  }
}

function mapLegacySlideshowType(
  type?: string,
): 'reveal' | 'slide' | 'fade' | undefined {
  switch (type) {
    case 'slide_in':
    case 'slide_from_sides':
      return 'slide';
    case 'reveal':
      return 'reveal';
    default:
      return 'fade';
  }
}
