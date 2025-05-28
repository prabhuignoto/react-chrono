import { useState, useEffect } from 'react';
import { TimelineItemModel } from '@models/TimelineItemModel';
import { basicData, nestedData, humanHistoryData } from '../data/index';

interface DemoData {
  items: TimelineItemModel[];
  nestedItems: TimelineItemModel[];
  historyItems: TimelineItemModel[];
  isLoading: boolean;
}

export const useDemoData = (): DemoData => {
  const [items, setItems] = useState<TimelineItemModel[]>([]);
  const [nestedItems, setNestedItems] = useState<TimelineItemModel[]>([]);
  const [historyItems, setHistoryItems] = useState<TimelineItemModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processedItems = basicData.map(
      ({
        title,
        url,
        cardTitle,
        cardSubtitle,
        cardDetailedText,
        id,
        timelineContent,
        date,
        items: nestedItems,
      }) => ({
        title,
        url,
        cardTitle,
        cardSubtitle,
        cardDetailedText,
        id,
        timelineContent,
        date,
        items: nestedItems,
      }),
    );

    const processedHistoryItems = humanHistoryData.map(
      ({ cardTitle, cardSubtitle, cardDetailedText, media, url, title }) => ({
        cardTitle,
        cardSubtitle,
        cardDetailedText,
        media,
        url,
        title,
      }),
    );

    const processedNestedItems = nestedData.map(
      ({
        cardTitle,
        cardSubtitle,
        cardDetailedText,
        media,
        url,
        title,
        items: nestedItems,
      }) => ({
        cardTitle,
        cardSubtitle,
        cardDetailedText,
        url,
        title,
        items: nestedItems,
      }),
    );

    setItems(processedItems);
    setHistoryItems(processedHistoryItems);
    setNestedItems(processedNestedItems);
    setIsLoading(false);
  }, []);

  return {
    items,
    nestedItems,
    historyItems,
    isLoading,
  };
}; 