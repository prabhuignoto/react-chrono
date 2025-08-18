import { TimelineContentModel } from '@models/TimelineContentModel';
import { TimelineProps } from '@models/TimelineModel';
import {
  ForwardRefExoticComponent,
  ReactNode,
  forwardRef,
  useMemo,
} from 'react';
import xss from 'xss';
import { useTimelineContext } from '../../contexts';
import {
  timelineContentDetails,
  timelineSubContent,
} from './timeline-card-content.css';

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
    detailedText: (string | ReactNode)[];
  },
) => ReactNode = ({
  fontSizes,
  parseDetailsAsHTML,
  theme,
  detailedText,
  cardTextClassName,
}) => {
  return detailedText.map((text, index) => {
    // Only apply xss if text is a string
    const props =
      parseDetailsAsHTML && typeof text === 'string'
        ? {
            dangerouslySetInnerHTML: {
              __html: xss(text),
            },
          }
        : null;
    return (
      <span
        className={`${timelineSubContent} ${cardTextClassName ?? ''}`}
        key={`timeline-text-${typeof text === 'string' ? text.substring(0, 10) : ''}-${index}`}
        {...props}
      >
        {parseDetailsAsHTML ? null : text}
      </span>
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
      const { fontSizes, classNames, parseDetailsAsHTML, textContentDensity } =
        useTimelineContext();

      const shouldNotShowText = useMemo(() => {
        return (
          (parseDetailsAsHTML && !isTextArray) || textContentDensity === 'LOW'
        );
      }, [isTextArray, parseDetailsAsHTML, textContentDensity]);

      // Generate the text content based on detailedText
      const getTextContent = () => {
        if (!isTextArray) {
          return parseDetailsAsHTML && typeof detailedText === 'string'
            ? xss(detailedText)
            : detailedText;
        }

        return renderTextArray({
          cardTextClassName: classNames?.cardText,
          detailedText: detailedText as (string | ReactNode)[],
          fontSizes,
          parseDetailsAsHTML,
          theme,
        });
      };

      // Create props for HTML content if needed
      const getTextContentProps = (textContent) => {
        if (parseDetailsAsHTML && !isTextArray) {
          return {
            dangerouslySetInnerHTML: {
              __html: xss(textContent),
            },
          };
        }
        return {};
      };

      const renderDetailedContent = (textContent) => {
        const textContentProps = getTextContentProps(textContent);

        return (
          <p
            className={
              timelineContentDetails + ' ' + (showMore ? 'active' : '')
            }
            ref={ref as any}
            {...textContentProps}
            style={{ color: theme?.cardDetailsColor }}
          >
            {shouldNotShowText ? null : textContent}
          </p>
        );
      };

      const renderTimelineContent = () => {
        if (timelineContent) {
          return <div ref={ref}>{timelineContent}</div>;
        }

        const textContent = getTextContent();
        return textContent ? renderDetailedContent(textContent) : null;
      };

      return renderTimelineContent();
    },
  );

  TextOrContent.displayName = 'Text Or Content';

  return TextOrContent;
};

export { getTextOrContent };
