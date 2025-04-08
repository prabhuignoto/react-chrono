import { FunctionComponent, ReactNode, memo } from 'react';
import { useUIState } from '../../hooks/useUIState';
import { ButtonWrapper, ToggleSwitch } from './toggle-button.styles';

export interface ToggleButtonProps {
  offIcon: ReactNode;
  onIcon: ReactNode;
  state: boolean;
  onChange?: (state: boolean) => void;
}

const ToggleButton: FunctionComponent<ToggleButtonProps> = memo(
  ({ offIcon, onIcon, state, onChange }) => {
    const { state: on, toggle } = useUIState(state || false);

    const handleToggle = () => {
      toggle();
      onChange?.(on);
    };

    return (
      <ButtonWrapper onClick={handleToggle}>
        <ToggleSwitch>{on ? offIcon : onIcon}</ToggleSwitch>
      </ButtonWrapper>
    );
  },
);

ToggleButton.displayName = 'ToggleButton';

export { ToggleButton };
