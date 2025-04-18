export interface Theme {
  primary: string;
  secondary: string;
  cardBgColor: string;
  cardForeColor: string;
  titleColor: string;
  titleColorActive: string;
}

export interface TimelineItem {
  title: string;
  cardTitle: string;
  cardSubtitle?: string;
  cardDetailedText?: string | string[];
  media?: {
    name: string;
    source: {
      url: string;
    };
    type: 'IMAGE' | 'VIDEO';
  };
  url?: string;
}
