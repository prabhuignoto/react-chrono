import { FunctionComponent, ReactNode, useState } from 'react';
import { ButtonWrapper, ToggleSwitch } from './toggle-button.styles';

export type ToggleButtonProps = {
  offIcon: ReactNode;
  onIcon: ReactNode;
  state: boolean;
};

const ToggleButton: FunctionComponent<ToggleButtonProps> = ({
  offIcon,
  onIcon,
  state,
}) => {
  const [on, setOn] = useState(state || false);
  const toggleState = () => setOn(!on);

  return (
    <ButtonWrapper onClick={() => toggleState()}>
      <ToggleSwitch>{on ? offIcon : onIcon}</ToggleSwitch>
    </ButtonWrapper>
  );
};

export { ToggleButton };
