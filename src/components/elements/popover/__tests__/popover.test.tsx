import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';

import userEvent from '@testing-library/user-event';
import { getDefaultThemeOrDark } from '@utils/index';
import { customRender, providerProps } from 'src/components/common/test';
import PopOver from '../index';

describe('PopOver', () => {
  const mockClosePopover = vi.fn();
  const mockToggleOpen = vi.fn();

  const theme = getDefaultThemeOrDark();

  beforeEach(() => {
    mockClosePopover.mockReset();
    mockToggleOpen.mockReset();
  });

  it('should render the placeholder text', () => {
    const placeholder = 'Select an option';
    customRender(
      <PopOver placeholder={placeholder} position="top" theme={theme}>
        <span>test</span>
      </PopOver>,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );

    const selecterLabel = screen.getByText(placeholder);
    expect(selecterLabel).toBeInTheDocument();
  });

  it('should toggle open state when clicking on the selecter', async () => {
    const placeholder = 'Select an option';
    const { getByRole, getByText } = customRender(
      <PopOver placeholder={placeholder} position="top" theme={theme}>
        <span>test</span>
      </PopOver>,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );

    const selecter = getByRole('button');
    expect(selecter).toBeInTheDocument();

    await fireEvent.click(selecter);

    expect(getByText('test')).toBeInTheDocument();
  });

  it('should close the popover when clicking outside', async () => {
    const placeholder = 'Select an option';
    const { getByRole, queryByText } = customRender(
      <PopOver placeholder={placeholder} position="top" theme={theme}>
        <span>test</span>
      </PopOver>,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );

    const selecter = getByRole('button');
    await fireEvent.click(selecter);

    expect(queryByText('test')).toBeInTheDocument();

    await fireEvent.click(document.body);

    expect(queryByText('test')).not.toBeInTheDocument();
  });

  it('should close the popover when pressing the Escape key', async () => {
    const user = userEvent.setup();
    const placeholder = 'Select an option';
    const { getByRole, queryByText, getByText } = customRender(
      <PopOver placeholder={placeholder} position="top" theme={theme}>
        <span>test</span>
      </PopOver>,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );

    const selecter = getByRole('button');
    await user.click(selecter);

    expect(queryByText('test')).toBeInTheDocument();

    getByText('test').focus();

    await user.keyboard('{Escape}');

    expect(queryByText('test')).not.toBeInTheDocument();
  });
});
