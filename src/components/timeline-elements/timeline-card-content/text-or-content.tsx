import { TimelineContentModel } from '@models/TimelineContentModel';
import { ForwardRefExoticComponent, forwardRef, useContext } from 'react';
import sanitizeHtml from 'sanitize-html';
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
      // const { timelineContent, theme, detailedText, showMore } = prop;
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
                    __html: sanitizeHtml(text, {
                      parseStyleAttributes: true,
                    }),
                  },
                }
              : null;
            console.log(props);
            return (
              <TimelineSubContent
                key={index}
                fontSize={fontSizes?.cardText}
                className={classNames?.cardText}
                theme={theme}
                {...props}
                // dangerouslySetInnerHTML={{
                //   __html: sanitizeHtml(text, {
                //     parseStyleAttributes: true,
                //   }),
                // }}
              >
                {parseDetailsTextHTML ? null : text}
              </TimelineSubContent>
            );
          });
        } else {
          textContent = parseDetailsTextHTML
            ? sanitizeHtml(detailedText, {
                parseStyleAttributes: true,
              })
            : detailedText;
        }

        const textContentProps =
          parseDetailsTextHTML && !isTextArray
            ? {
                dangerouslySetInnerHTML: {
                  __html: sanitizeHtml(textContent, {
                    parseStyleAttributes: true,
                  }),
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
