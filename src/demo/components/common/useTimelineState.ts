import { Theme } from '@models/Theme';
import { TimelineItemModel } from '@models/TimelineItemModel';
import { useEffect, useState } from 'react';

export const useTimelineState = (data: TimelineItemModel[], dataNested: TimelineItemModel[], worldHistory: TimelineItemModel[]) => {
  const [items, setItems] = useState<TimelineItemModel[]>([]);
  const [nestedItems, setNestedItems] = useState<TimelineItemModel[]>([]);
  const [historyItems, setHistoryItems] = useState<TimelineItemModel[]>([]);
  const [state, setState] = useState(0);
  const [customTheme, setCustomTheme] = useState<Theme>({
    cardBgColor: '#f5f5f5',
    primary: '#000',
    secondary: '#FFA500',
  });

  useEffect(() => {
    if (state > 0) {
      setCustomTheme({
        cardBgColor: '#efefef',
        primary: '#000',
        secondary: '#FFA500',
      });
    } else {
      setCustomTheme({
        cardBgColor: '#f5f5f5',
        primary: '#000',
        secondary: '#FFA500',
        titleColorActive: '#000',
      });
    }
  }, [state]);

  useEffect(() => {
    const newItems = data.map(
      ({
        title,
        url,
        cardTitle,
        cardSubtitle,
        cardDetailedText,
        id,
        timelineContent,
        date,
        items,
      }) => ({
        title,
        url,
        cardTitle,
        cardSubtitle,
        cardDetailedText,
        id,
        timelineContent,
        date,
        items,
      }),
    );
    setItems(newItems);
    setHistoryItems(
      worldHistory.map(
        ({ cardTitle, cardSubtitle, cardDetailedText, media, url, title }) => ({
          cardTitle,
          cardSubtitle,
          cardDetailedText,
          media,
          url,
          title,
        }),
      ),
    );
    setNestedItems(
      dataNested.map(
        ({
          cardTitle,
          cardSubtitle,
          cardDetailedText,
          media,
          url,
          title,
          items,
        }) => ({
          cardTitle,
          cardSubtitle,
          cardDetailedText,
          url,
          title,
          items,
        }),
      ),
    );
  }, [data, dataNested, worldHistory]);

  return {
    items,
    nestedItems,
    historyItems,
    state,
    setState,
    customTheme,
  };
}; 