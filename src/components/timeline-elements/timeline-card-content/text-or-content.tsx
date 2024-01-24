import { TimelineContentModel } from '@models/TimelineContentModel';
import { TimelineProps } from '@models/TimelineModel';
import {
  ForwardRefExoticComponent,
  ReactNode,
  forwardRef,
  useContext,
} from 'react';
import xss from 'xss';
import { GlobalContext } from '../../GlobalContext';
import {
  TimelineContentDetails,
  TimelineSubContent,
} from './timeline-card-content.styles';

// Define the type for the TextOrContentModel
export type TextOrContentModel = Pick<
  TimelineContentModel,
  'timelineContent' | 'theme' | 'detailedText'
> & {
  showMore?: boolean;
};

// Function to render an array of text
const renderTextArray: (
  p: Pick<TimelineProps, 'parseDetailsAsHTML' | 'fontSizes' | 'theme'> & {
    cardTextClassName: string;
    detailedText: string[];
  },
) => ReactNode = ({
  fontSizes,
  parseDetailsAsHTML,
  theme,
  detailedText,
  cardTextClassName,
}) => {
  return (detailedText as string[]).map((text, index) => {
    const props = parseDetailsAsHTML
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
        className={cardTextClassName}
        theme={theme}
        {...props}
      >
        {parseDetailsAsHTML ? null : text}
      </TimelineSubContent>
    );
  });
};

// Function to get the TextOrContent component
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
      const { fontSizes, classNames, parseDetailsAsHTML } =
        useContext(GlobalContext);

      const renderTimelineContent = () => {
        if (timelineContent) {
          return <div ref={ref}>{timelineContent}</div>;
        } else {
          let textContent = null;
          if (isTextArray) {
            textContent = renderTextArray({
              cardTextClassName: classNames?.cardText,
              detailedText: detailedText as string[],
              fontSizes,
              parseDetailsAsHTML,
              theme,
            });
          } else {
            textContent = parseDetailsAsHTML ? xss(detailedText) : detailedText;
          }

          const textContentProps =
            parseDetailsAsHTML && !isTextArray
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
              {parseDetailsAsHTML && !isTextArray ? null : textContent}
            </TimelineContentDetails>
          ) : null;
        }
      };

      return renderTimelineContent();
    },
  );

  TextOrContent.displayName = 'Text Or Content';

  return TextOrContent;
};

export { getTextOrContent };
