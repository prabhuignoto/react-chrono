import cls from 'classnames';
import {
  CardTitle,
  CardTitleAnchor,
} from '../timeline-card-content/timeline-card-content.styles';
import { Title } from './memoized-model';

const TitleMemo = ({
  title,
  url,
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
    >
      {url ? (
        <CardTitleAnchor href={url} target="_blank" rel="noreferrer">
          {title}
        </CardTitleAnchor>
      ) : (
        title
      )}
    </CardTitle>
  ) : null;
};

TitleMemo.displayName = 'Timeline Title';

export { TitleMemo };
