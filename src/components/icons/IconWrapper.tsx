import React from 'react';
import cls from 'classnames';
import { 
  iconBase, 
  iconSm, 
  iconMd, 
  iconLg, 
  iconXl, 
  buttonIcon, 
  toolbarIcon, 
  controlIcon 
} from './icon-base.css';

type IconSize = 'sm' | 'md' | 'lg' | 'xl';
type IconContext = 'button' | 'toolbar' | 'control' | 'default';

interface IconWrapperProps {
  children: React.ReactNode;
  size?: IconSize;
  context?: IconContext;
  className?: string;
  'aria-hidden'?: boolean;
  role?: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  size,
  context = 'default',
  className,
  'aria-hidden': ariaHidden = true,
  role = 'img',
  ...props
}) => {
  const getIconClasses = () => {
    const classes = [iconBase];
    
    // Context-specific sizing (overrides size prop)
    switch (context) {
      case 'button':
        classes.push(buttonIcon);
        break;
      case 'toolbar':
        classes.push(toolbarIcon);
        break;
      case 'control':
        classes.push(controlIcon);
        break;
      default:
        // Use size prop for default context
        switch (size) {
          case 'sm':
            classes.push(iconSm);
            break;
          case 'md':
            classes.push(iconMd);
            break;
          case 'lg':
            classes.push(iconLg);
            break;
          case 'xl':
            classes.push(iconXl);
            break;
          default:
            classes.push(iconMd); // default to medium
        }
    }
    
    if (className) {
      classes.push(className);
    }
    
    return cls(...classes);
  };

  return (
    <span 
      className={getIconClasses()} 
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : role}
      {...props}
    >
      {children}
    </span>
  );
};

export default React.memo(IconWrapper);