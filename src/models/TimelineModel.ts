import { Theme } from './Theme';
import { TimelineItemModel } from './TimelineItemModel';

export type TextDensity = 'LOW' | 'HIGH';

/**
 * model internally used by the component
 *
 * @export
 * @interface TimelineModel
 * @extends {TimelineProps}
 */
export type TimelineModel = Pick<
  TimelineProps,
  | 'items'
  | 'onItemSelected'
  | 'onRestartSlideshow'
  | 'theme'
  | 'slideShow'
  | 'onScrollEnd'
  | 'mode'
  | 'timelinePointDimension'
  | 'nestedCardHeight'
  | 'noUniqueId'
  | 'uniqueId'
> & {
  activeTimelineItem?: number;
  contentDetailsChildren?: React.ReactNode | React.ReactNode[];
  iconChildren?: React.ReactNode | React.ReactNode[];
  isChild?: boolean;
  onFirst?: () => void;
  onLast?: () => void;
  onNext?: () => void;
  onOutlineSelection?: (index: number) => void;
  onPaused?: () => void;
  onPrevious?: () => void;
  onTimelineUpdated?: (id: number) => void;
  slideItemDuration?: number;
  slideShowEnabled?: boolean;
  slideShowRunning?: boolean;
};

type Option = {
  helpText?: string;
  text: string;
};

type ChangeDensityOptions = {
  high?: Option;
  low?: Option;
};

type ChangeLayoutOptions = {
  alternating?: Option;
  horizontal?: Option;
  horizontal_all?: Option;
  vertical?: Option;
};

export type ButtonTexts = {
  changeDensity?: string;
  changeDensityOptions?: ChangeDensityOptions;
  changeLayout?: string;
  changeLayoutOptions?: ChangeLayoutOptions;
  dark?: string;
  first: string;
  jumpTo?: string;
  last: string;
  light?: string;
  next?: string;
  play?: string;
  previous?: string;
  stop?: string;
};

/**
 * Main props used by the host app.
 *
 * @export
 * @interface TimelineProps
 */
export type TimelineProps = {
  // active item index
  activeItemIndex?: number;

  // alignMedia?: 'left' | 'right' | 'center';

  // allow dynamic update of the timeline items
  allowDynamicUpdate?: boolean;

  // removes the borders from the cards
  borderLessCards?: boolean;

  // custom button texts
  buttonTexts?: ButtonTexts;

  // minimum height of the card
  cardHeight?: number;

  // remove/hide cards
  cardLess?: boolean;

  // position of the card in horizontal mode
  cardPositionHorizontal?: 'TOP' | 'BOTTOM';

  // minimum width of the card
  cardWidth?: number;

  children?: React.ReactElement | React.ReactElement[];

  // custom class names for the different elements
  classNames?: {
    card?: string;
    cardMedia?: string;
    cardSubTitle?: string;
    cardText?: string;
    cardTitle?: string;
    controls?: string;
    title?: string;
  };

  // height of the details text
  contentDetailsHeight?: number;

  darkMode?: boolean;
  // disables the auto scroll on click
  disableAutoScrollOnClick?: boolean;

  // disables the click on the circle
  disableClickOnCircle?: boolean;

  disableInteraction?: boolean;

  disableNavOnKey?: boolean;

  disableTimelinePoint?: boolean;

  disableToolbar?: boolean;

  enableBreakPoint?: boolean;

  enableDarkToggle?: boolean;

  enableLayoutSwitch?: boolean;

  enableQuickJump?: boolean;

  // flips the layout, useful for RTL
  flipLayout?: boolean;

  // focus the active item on load
  focusActiveItemOnLoad?: boolean;

  // custom font sizes
  fontSizes?: {
    cardSubtitle?: string;
    cardText?: string;
    cardTitle?: string;
    title?: string;
  };

  highlightCardsOnHover?: boolean;

  itemWidth?: number;

  // collection of timeline items
  items?: TimelineItemModel[];

  // width of the timeline line
  lineWidth?: number;

  // minimum height of the media element
  mediaHeight?: number;

  mediaSettings?: {
    align?: 'left' | 'right' | 'center';
    imageFit?: 'cover' | 'contain' | 'fill' | 'none';
  };

  // mode of the timeline. VERTICAL, HORIZONTAL, VERTICAL_ALTERNATING
  mode?: TimelineMode;

  nestedCardHeight?: number;

  noUniqueId?: boolean;

  // callback when an item is selected
  onItemSelected?: (
    data: Pick<
      TimelineItemModel,
      'title' | 'cardDetailedText' | 'cardSubtitle' | 'cardTitle'
    > & { index: number },
  ) => void;

  // callback when the slideshow is restarted
  onRestartSlideshow?: () => void;

  // callback when the scroll ends
  onScrollEnd?: () => void;

  onThemeChange?: () => void;

  parseDetailsAsHTML?: boolean;

  responsiveBreakPoint?: number;

  // option to enable scrollbar
  scrollable?: boolean | { scrollbar: boolean };

  // show all cards in horizontal mode
  showAllCardsHorizontal?: boolean;

  showProgressOnSlideshow?: boolean;

  // duration each slide is shown
  slideItemDuration?: number;

  // enables the slideshow
  slideShow?: boolean;

  slideShowType?: SlideShowType;

  textDensity?: TextDensity;

  textOverlay?: boolean;

  // custom theme
  theme?: Theme;

  // width of the timeline circle
  timelinePointDimension?: number;

  timelinePointShape?: 'circle' | 'square' | 'diamond';

  // title for the timeline
  title?: string;

  titleDateFormat?: string;

  toolbarPosition?: 'top' | 'bottom';

  uniqueId?: string;

  // enables the read more button
  useReadMore?: boolean;
};

export type SlideShowType = 'reveal' | 'slide_in' | 'slide_from_sides';

export type TimelineMode =
  | 'VERTICAL'
  | 'HORIZONTAL'
  | 'VERTICAL_ALTERNATING'
  | 'HORIZONTAL_ALL';
