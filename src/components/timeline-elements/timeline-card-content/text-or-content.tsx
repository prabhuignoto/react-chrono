import { TimelineContentModel } from '@models/TimelineContentModel';
import { TimelineProps } from '@models/TimelineModel';
import {
  ForwardRefExoticComponent,
  ReactNode,
  forwardRef,
  useContext,
  useMemo,
} from 'react';
import xss from 'xss';
import { GlobalContext } from '../../GlobalContext';
import { useSearch } from '../../common/SearchContext';
import TextHighlighter from '../../common/TextHighlighter';
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
    searchTerm?: string;
  },
) => ReactNode = ({
  fontSizes,
  parseDetailsAsHTML,
  theme,
  detailedText,
  cardTextClassName,
  searchTerm,
}) => {
  return detailedText.map((text, index) => {
    // If we need to parse HTML, we can't use the highlighter
    if (parseDetailsAsHTML) {
      const props = {
        dangerouslySetInnerHTML: {
          __html: xss(text),
        },
      };
      return (
        <TimelineSubContent
          key={index}
          fontSize={fontSizes?.cardText}
          className={cardTextClassName}
          theme={theme}
          {...props}
        />
      );
    }

    // Otherwise, use the highlighter when we have a search term
    return (
      <TimelineSubContent
        key={index}
        fontSize={fontSizes?.cardText}
        className={cardTextClassName}
        theme={theme}
      >
        {searchTerm ? (
          <TextHighlighter
            text={text}
            searchTerm={searchTerm}
            theme={theme ?? {}}
          />
        ) : (
          text
        )}
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
    (_, ref) => {
      const isTextArray = Array.isArray(detailedText);
      const { fontSizes, classNames, parseDetailsAsHTML, textDensity } =
        useContext(GlobalContext);
      const { searchTerm } = useSearch();

      const renderTimelineContent = () => {
        if (timelineContent) {
          return <div ref={ref}>{timelineContent}</div>;
        } else {
          let textContent = null;
          if (isTextArray) {
            textContent = renderTextArray({
              cardTextClassName: classNames?.cardText ?? '',
              detailedText,
              fontSizes,
              parseDetailsAsHTML,
              theme,
              searchTerm,
            });
          } else {
            // For HTML parsing, we can't use the highlighter
            if (parseDetailsAsHTML) {
              textContent = xss(detailedText ?? '');
            } else {
              textContent = detailedText;
            }
          }

          const textContentProps =
            parseDetailsAsHTML && !isTextArray
              ? {
                  dangerouslySetInnerHTML: {
                    __html: xss(String(textContent ?? '')),
                  },
                }
              : {};

          const shouldNotShowText = useMemo(() => {
            return (
              (parseDetailsAsHTML && !isTextArray) || textDensity === 'LOW'
            );
          }, [isTextArray, textDensity]);

          // For non-parsed and non-array content, we can show the highlighter
          if (
            textContent &&
            !parseDetailsAsHTML &&
            !isTextArray &&
            searchTerm
          ) {
            return (
              <TimelineContentDetails
                className={`timeline-content-details ${showMore ? 'active' : ''}`}
                ref={ref}
                theme={theme}
              >
                <TextHighlighter
                  text={String(textContent ?? '')}
                  searchTerm={searchTerm}
                  theme={theme ?? {}}
                />
              </TimelineContentDetails>
            );
          }

          return textContent ? (
            <TimelineContentDetails
              className={`timeline-content-details ${showMore ? 'active' : ''}`}
              ref={ref}
              theme={theme}
              {...textContentProps}
            >
              {shouldNotShowText ? null : textContent}
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
