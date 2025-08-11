import { button, buttonIcon } from './timeline-card-media-buttons.css';
import { buttonWrapper } from './timeline-card-media.css';

export const ExpandButton = (props: React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>) => (
  <button className={button} {...props}>
    <span className={buttonIcon}>{props.children}</span>
  </button>
);

export const ShowHideTextButton = (
  props: React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>,
) => (
  <button className={button} {...props}>
    <span className={buttonIcon}>{props.children}</span>
  </button>
);

export const ButtonWrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <ul className={buttonWrapper}>{children}</ul>
);
