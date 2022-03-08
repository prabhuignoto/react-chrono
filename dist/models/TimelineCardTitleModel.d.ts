import { Theme } from './Theme';
export interface TitleModel {
    active?: boolean;
    align?: 'left' | 'right';
    theme?: Theme;
    title?: string;
}
