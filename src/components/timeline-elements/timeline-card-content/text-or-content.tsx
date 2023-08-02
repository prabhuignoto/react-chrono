import { TimelineContentModel } from '@models/TimelineContentModel';
import { ForwardRefExoticComponent, forwardRef, useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
import {
  TimelineSubContent,
  TimelineContentDetails,
} from './timeline-card-content.styles';

export type TextOrContentModel = Pick<
  TimelineContentModel,
  'timelineContent' | 'theme' | 'detailedText'
> & {
  showMore?: boolean;
};

const getTextOrContent: (
  p: TextOrContentModel,
) => ForwardRefExoticComponent<TextOrContentModel> = ({
  timelineContent,
  theme,
  detailedText,
  showMore,
}) => {
  const TextOrContent = forwardRef<HTMLParagraphElement, TextOrContentModel>(
    (prop, ref) => {
      // const { timelineContent, theme, detailedText, showMore } = prop;
      const isTextArray = Array.isArray(detailedText);

      const { fontSizes, classNames } = useContext(GlobalContext);

      if (timelineContent) {
        return <div ref={ref}>{timelineContent}</div>;
      } else {
        let textContent = null;
        if (isTextArray) {
          textContent = (detailedText as string[]).map((text, index) => (
            <TimelineSubContent
              key={index}
              fontSize={fontSizes?.cardText}
              className={classNames?.cardText}
              theme={theme}
            >
              {text}
            </TimelineSubContent>
          ));
        } else {
          textContent = detailedText;
        }

        return textContent ? (
          <TimelineContentDetails
            className={showMore ? 'active' : ''}
            ref={ref}
            theme={theme}
          >
            {textContent}
          </TimelineContentDetails>
        ) : null;
      }
    },
  );

  TextOrContent.displayName = 'Text Or Content';

  return TextOrContent;
};

export { getTextOrContent };
