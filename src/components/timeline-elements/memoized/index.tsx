import cls from 'classnames';
import React, { memo, useCallback, useMemo } from 'react';
import { hexToRGBA } from '../../../utils';
import { MaximizeIcon, MinimizeIcon, MinusIcon, PlusIcon } from '../../icons';
import {
  CardSubTitle,
  CardTitle,
  CardTitleAnchor,
} from '../timeline-card-content/timeline-card-content.styles';
import {
  ExpandButton,
  ShowHideTextButton,
} from '../timeline-card-media/timeline-card-media-buttons';
import { DetailsTextWrapper } from './../timeline-card-media/timeline-card-media.styles';
import {
  Content,
  DetailsTextMemoModel,
  ExpandButtonModel,
  ShowHideTextButtonModel,
  Title,
} from './memoized-model';

const TitleMemo = ({
  title,
  url,
  urlClassName,
  theme,
  color,
  dir,
  active,
  fontSize = '1rem',
  classString = '',
  padding = false,
}: Title) => {
  return title ? (
    <CardTitle
      className={cls(active ? 'active' : '', { [classString]: true })}
      theme={theme}
      style={{ color }}
      dir={dir}
      $fontSize={fontSize}
      data-class={classString}
      $padding={padding}
      onClick={typeof url === 'function' ? url : () => {}}
    >
      {typeof url === 'string' ? (
        <CardTitleAnchor href={url} target="_blank" rel="noreferrer">
          {title}
        </CardTitleAnchor>
      ) : (
        <span className={cls(url ? urlClassName : '')}>{title}</span>
      )}
    </CardTitle>
  ) : null;
};

TitleMemo.displayName = 'Timeline Title';

const SubTitleMemo = React.memo<Content>(
  ({ content, color, dir, theme, fontSize, classString, padding }: Content) =>
    content ? (
      <CardSubTitle
        style={{ color }}
        dir={dir}
        theme={theme}
        $fontSize={fontSize}
        className={cls('card-sub-title', classString)}
        $padding={padding}
      >
        {content}
      </CardSubTitle>
    ) : null,
  (prev, next) =>
    prev.theme?.cardSubtitleColor === next.theme?.cardSubtitleColor,
);

SubTitleMemo.displayName = 'Timeline Content';

export const ExpandButtonMemo = memo<ExpandButtonModel>(
  ({ theme, expanded, onExpand, textOverlay }: ExpandButtonModel) => {
    const label = useMemo(() => {
      return expanded ? 'Minimize' : 'Maximize';
    }, [expanded]);

    return textOverlay ? (
      <ExpandButton
        onPointerDown={onExpand}
        onKeyDown={(ev) => ev.key === 'Enter' && onExpand?.(ev)}
        theme={theme}
        aria-expanded={expanded}
        tabIndex={0}
        aria-label={label}
        title={label}
      >
        {expanded ? <MinimizeIcon /> : <MaximizeIcon />}
      </ExpandButton>
    ) : null;
  },
  (prev, next) => prev.expanded === next.expanded,
);

ExpandButtonMemo.displayName = 'Expand Button';

export const ShowOrHideTextButtonMemo = memo<ShowHideTextButtonModel>(
  ({ textOverlay, onToggle, theme, show }: ShowHideTextButtonModel) => {
    const label = useMemo(() => {
      return show ? 'Hide Text' : 'Show Text';
    }, [show]);

    return textOverlay ? (
      <ShowHideTextButton
        onPointerDown={onToggle}
        theme={theme}
        tabIndex={0}
        onKeyDown={(ev) => ev.key === 'Enter' && onToggle?.(ev)}
        aria-label={label}
        title={label}
      >
        {show ? <MinusIcon /> : <PlusIcon />}
      </ShowHideTextButton>
    ) : null;
  },
);

ShowOrHideTextButtonMemo.displayName = 'Show Hide Text Button';

const DetailsTextMemo = memo<DetailsTextMemoModel>(
  ({
    theme,
    show,
    expand,
    textOverlay,
    text,
    height,
    onRender,
  }: DetailsTextMemoModel) => {
    const onTextRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        onRender?.(node.clientHeight);
      }
    }, []);

    const Text = text;

    const background = useMemo(() => {
      const bg = theme?.cardDetailsBackGround || '';
      if (bg) {
        return hexToRGBA(bg, 0.8);
      } else {
        return bg;
      }
    }, [theme?.cardDetailsBackGround]);

    return textOverlay ? (
      <DetailsTextWrapper
        ref={onTextRef}
        // height={expand ? height : 0}
        $expandFull={expand}
        theme={theme}
        $show={show}
        background={background}
      >
        <Text />
      </DetailsTextWrapper>
    ) : null;
  },
  (prev, next) =>
    prev.height === next.height &&
    prev.show === next.show &&
    prev.expand === next.expand &&
    JSON.stringify(prev.theme) === JSON.stringify(next.theme),
);

DetailsTextMemo.displayName = 'Details Text';

export { TitleMemo, SubTitleMemo, DetailsTextMemo };
