import React from 'react';
import { Theme } from '../../../models/Theme';
interface Title {
    active?: boolean;
    color?: string;
    dir?: string;
    theme?: Theme;
    title?: string;
    url?: string;
}
interface Content {
    color?: string;
    content?: string;
    dir?: string;
    theme?: Theme;
}
declare const MemoTitle: React.MemoExoticComponent<({ title, url, theme, color, dir, active }: Title) => JSX.Element | null>;
declare const MemoSubTitle: React.NamedExoticComponent<Content>;
export { MemoTitle, MemoSubTitle };
