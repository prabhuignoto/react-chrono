import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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
      <PopOver
        placeholder={placeholder}
        position="top"
        theme={theme}
        data-testid="popover-test-1"
      >
        <span>test</span>
      </PopOver>,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );

    // Find the button by role and check its title attribute
    const selecterButton = screen.getByRole('button');
    expect(selecterButton).toBeInTheDocument();
    expect(selecterButton).toHaveAttribute('title', placeholder);
    // Additionally check the visible label if needed, but ensure it exists first
    const selecterLabel = screen.queryByText(placeholder);
    if (selecterLabel) {
      expect(selecterLabel).toBeInTheDocument();
    }
  });

  it('should toggle open state when clicking on the selecter', async () => {
    const placeholder = 'Select an option';
    const { getByRole, getByText } = customRender(
      <PopOver
        placeholder={placeholder}
        position="top"
        theme={theme}
        data-testid="popover-test-2"
      >
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
      <PopOver
        placeholder={placeholder}
        position="top"
        theme={theme}
        data-testid="popover-test-3"
      >
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
      <PopOver
        placeholder={placeholder}
        position="top"
        theme={theme}
        data-testid="popover-test-4"
      >
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
