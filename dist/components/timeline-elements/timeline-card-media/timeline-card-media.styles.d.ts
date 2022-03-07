/// <reference types="react" />
import { Theme } from '../../../models/Theme';
import { TimelineMode } from '../../../models/TimelineModel';
export declare const MediaWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
} & {
    active?: boolean | undefined;
    cardHeight?: number | undefined;
    dir?: string | undefined;
    mode?: TimelineMode | undefined;
    slideShowActive?: boolean | undefined;
    theme?: Theme | undefined;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const CardImage: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
} & {
    active?: boolean | undefined;
    dir?: string | undefined;
    mode?: TimelineMode | undefined;
    visible?: boolean | undefined;
}, import("react").DetailedHTMLProps<import("react").ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, {}>;
export declare const CardVideo: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
} & {
    height?: number | undefined;
}, import("react").DetailedHTMLProps<import("react").VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>, {}>;
export declare const MediaDetailsWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
} & {
    mode?: TimelineMode | undefined;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const ErrorMessage: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
export declare const IFrameVideo: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
}, import("react").DetailedHTMLProps<import("react").IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>, {}>;
