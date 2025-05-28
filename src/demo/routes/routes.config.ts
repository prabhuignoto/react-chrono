import { RouteObject } from 'react-router-dom';
import { TimelineItemModel } from '@models/TimelineItemModel';
import { Theme } from '@models/Theme';

export interface DemoRouteProps {
  items: TimelineItemModel[];
  nestedItems: TimelineItemModel[];
  historyItems: TimelineItemModel[];
  customTheme: Theme;
  state: number;
  setState: (state: number) => void;
}

export interface RouteConfig {
  path: string;
  label: string;
  category: 'vertical' | 'horizontal' | 'custom' | 'special';
  description?: string;
}

export const routeConfigs: RouteConfig[] = [
  {
    path: '/',
    label: 'Vertical Basic (Default)',
    category: 'vertical',
    description: 'Basic vertical timeline with cards',
  },
  {
    path: '/vertical-basic',
    label: 'Vertical Basic',
    category: 'vertical',
    description: 'Basic vertical timeline with cards',
  },
  {
    path: '/vertical-basic-nested',
    label: 'Vertical Basic Nested',
    category: 'vertical',
    description: 'Vertical timeline with nested items',
  },
  {
    path: '/vertical-alternating-mixed',
    label: 'Vertical Alternating Mixed',
    category: 'vertical',
    description: 'Vertical alternating timeline with mixed content',
  },
  {
    path: '/vertical-alternating-nested',
    label: 'Vertical Alternating Nested',
    category: 'vertical',
    description: 'Vertical alternating timeline with nested items',
  },
  {
    path: '/vertical-alternating',
    label: 'Vertical Alternating',
    category: 'vertical',
    description: 'Vertical alternating timeline with theme toggle',
  },
  {
    path: '/vertical-world-history',
    label: 'Vertical World History',
    category: 'vertical',
    description: 'Vertical timeline showcasing world history events',
  },
  {
    path: '/horizontal',
    label: 'Horizontal',
    category: 'horizontal',
    description: 'Basic horizontal timeline',
  },
  {
    path: '/horizontal-all',
    label: 'Horizontal All',
    category: 'horizontal',
    description: 'Horizontal timeline with all features',
  },
  {
    path: '/horizontal-initial-select',
    label: 'Horizontal Initial Select',
    category: 'horizontal',
    description: 'Horizontal timeline with initial item selected',
  },
  {
    path: '/vertical-custom',
    label: 'Vertical Custom',
    category: 'custom',
    description: 'Vertical timeline with custom content',
  },
  {
    path: '/vertical-custom-icon',
    label: 'Vertical Custom Icon',
    category: 'custom',
    description: 'Vertical timeline with custom icons',
  },
  {
    path: '/dynamic-load',
    label: 'Dynamic Load',
    category: 'special',
    description: 'Timeline with dynamic content loading',
  },
  {
    path: '/timeline-without-cards',
    label: 'Timeline Without Cards (Vertical)',
    category: 'special',
    description: 'Vertical timeline without card components',
  },
  {
    path: '/timeline-without-cards-horizontal',
    label: 'Timeline Without Cards (Horizontal)',
    category: 'special',
    description: 'Horizontal timeline without card components',
  },
];

export const getRoutesByCategory = (category: RouteConfig['category']) => 
  routeConfigs.filter(route => route.category === category); 