import { Theme } from '@models/Theme';
import { TimelineContentModel } from '@models/TimelineContentModel';

export type ContentHeaderProps = Pick<
  TimelineContentModel,
  'theme' | 'url' | 'title' | 'media' | 'content' | 'cardTitle'
>;

export type ContentFooterProps = {
  canShow: boolean;
  isNested?: boolean;
  onExpand: () => void;
  remainInterval: number;
  showMore: boolean;
  showReadMore?: boolean | '';
  startWidth: number;
  textContentIsLarge: boolean;
  theme?: Theme;
  triangleDir?: string;
};
