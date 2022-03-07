/// <reference types="react" />
import { Theme } from '../../../models/Theme';
import { OutlinePosition } from './timeline-outline';
export declare const OutlineWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
} & {
    open?: boolean | undefined;
    position?: OutlinePosition | undefined;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const OutlinePane: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
} & {
    open?: boolean | undefined;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, {}>;
export declare const OutlineButton: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
} & {
    open?: boolean | undefined;
    position?: OutlinePosition | undefined;
    theme?: Theme | undefined;
}, import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, {}>;
export declare const List: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLUListElement>, HTMLUListElement>, {}>;
export declare const ListItem: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
}, import("react").DetailedHTMLProps<import("react").LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, {}>;
export declare const ListItemName: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
} & {
    selected?: boolean | undefined;
    theme?: Theme | undefined;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
export declare const ListItemBullet: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
} & {
    selected?: boolean | undefined;
    theme?: Theme | undefined;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
