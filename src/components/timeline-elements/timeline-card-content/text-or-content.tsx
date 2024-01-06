import { TimelineContentModel } from '@models/TimelineContentModel';
import { ForwardRefExoticComponent, forwardRef, useContext } from 'react';
import xss from 'xss';
import { GlobalContext } from '../../GlobalContext';
import {
  TimelineContentDetails,
  TimelineSubContent,
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
      const isTextArray = Array.isArray(detailedText);

      const { fontSizes, classNames, parseDetailsTextHTML } =
        useContext(GlobalContext);

      if (timelineContent) {
        return <div ref={ref}>{timelineContent}</div>;
      } else {
        let textContent = null;
        if (isTextArray) {
          textContent = (detailedText as string[]).map((text, index) => {
            const props = parseDetailsTextHTML
              ? {
                  dangerouslySetInnerHTML: {
                    __html: xss(text),
                  },
                }
              : null;
            return (
              <TimelineSubContent
                key={index}
                fontSize={fontSizes?.cardText}
                className={classNames?.cardText}
                theme={theme}
                {...props}
              >
                {parseDetailsTextHTML ? null : text}
              </TimelineSubContent>
            );
          });
        } else {
          textContent = parseDetailsTextHTML ? xss(detailedText) : detailedText;
        }

        const textContentProps =
          parseDetailsTextHTML && !isTextArray
            ? {
                dangerouslySetInnerHTML: {
                  __html: xss(textContent),
                },
              }
            : {};

        return textContent ? (
          <TimelineContentDetails
            className={showMore ? 'active' : ''}
            ref={ref}
            theme={theme}
            {...textContentProps}
          >
            {parseDetailsTextHTML && !isTextArray ? null : textContent}
          </TimelineContentDetails>
        ) : null;
      }
    },
  );

  TextOrContent.displayName = 'Text Or Content';

  return TextOrContent;
};

export { getTextOrContent };
