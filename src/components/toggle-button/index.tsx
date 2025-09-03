import { FunctionComponent, ReactNode, memo } from 'react';
import { useUIState } from '../../hooks/useUIState';
import { buttonWrapper, toggleSwitch } from './toggle-button.css';

export interface ToggleButtonProps {
  offIcon: ReactNode;
  onIcon: ReactNode;
  state: boolean;
  onChange?: (state: boolean) => void;
}

const ToggleButton: FunctionComponent<ToggleButtonProps> = memo(
  ({ offIcon, onIcon, state, onChange }) => {
    const { state: on, toggle } = useUIState(state ?? false);

    const handleToggle = () => {
      toggle();
      onChange?.(on);
    };

    return (
      <button className={buttonWrapper()} onClick={handleToggle} type="button">
        <span className={toggleSwitch}>{on ? offIcon : onIcon}</span>
      </button>
    );
  },
);

ToggleButton.displayName = 'ToggleButton';

export { ToggleButton };
