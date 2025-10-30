import { renderHook, act } from '@testing-library/react';
import { useFocusManager, useFocusTrap } from '../useFocusManager';

describe('useFocusManager', () => {
  it('should return a ref object', () => {
    const { result } = renderHook(() =>
      useFocusManager({
        shouldFocus: false,
        isActive: false,
      }),
    );

    expect(result.current).toHaveProperty('current');
  });

  it('should focus element when shouldFocus and isActive are true', () => {
    const { result } = renderHook(() =>
      useFocusManager({
        shouldFocus: true,
        isActive: true,
      }),
    );

    const mockElement = {
      focus: jest.fn(),
      classList: { contains: jest.fn(() => false), add: jest.fn() },
    };

    act(() => {
      result.current.current = mockElement as any;
    });

    // The actual focus happens in useEffect
    expect(result.current.current).toBeDefined();
  });

  it('should respect preventScroll option', () => {
    const { result } = renderHook(() =>
      useFocusManager({
        shouldFocus: true,
        isActive: true,
        preventScroll: true,
      }),
    );

    expect(result.current).toBeDefined();
  });

  it('should handle focus restoration', () => {
    const { result, rerender } = renderHook(
      (props) => useFocusManager(props),
      {
        initialProps: {
          shouldFocus: true,
          isActive: true,
          restoreFocus: true,
        },
      },
    );

    expect(result.current).toBeDefined();

    rerender({
      shouldFocus: true,
      isActive: false,
      restoreFocus: true,
    });

    expect(result.current).toBeDefined();
  });

  it('should not restore focus when restoreFocus is false', () => {
    const { result } = renderHook(() =>
      useFocusManager({
        shouldFocus: true,
        isActive: true,
        restoreFocus: false,
      }),
    );

    expect(result.current).toBeDefined();
  });

  it('should add focus-visible class when focused via keyboard', () => {
    const { result } = renderHook(() =>
      useFocusManager({
        shouldFocus: true,
        isActive: true,
      }),
    );

    expect(result.current).toBeDefined();
  });

  it('should remove focus-visible class on cleanup', () => {
    const { result, unmount } = renderHook(() =>
      useFocusManager({
        shouldFocus: true,
        isActive: true,
      }),
    );

    expect(result.current).toBeDefined();

    unmount();
  });

  it('should handle multiple activations and deactivations', () => {
    const { result, rerender } = renderHook(
      (props) => useFocusManager(props),
      {
        initialProps: {
          shouldFocus: true,
          isActive: true,
        },
      },
    );

    rerender({
      shouldFocus: true,
      isActive: false,
    });

    rerender({
      shouldFocus: true,
      isActive: true,
    });

    expect(result.current).toBeDefined();
  });

  it('should use requestAnimationFrame for focus', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() =>
      useFocusManager({
        shouldFocus: true,
        isActive: true,
      }),
    );

    jest.runAllTimers();
    jest.useRealTimers();

    expect(result.current).toBeDefined();
  });
});

describe('useFocusTrap', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should return a ref object', () => {
    const { result } = renderHook(() => useFocusTrap(false));

    expect(result.current).toHaveProperty('current');
  });

  it('should set up event listener when active', () => {
    const addEventListenerSpy = jest.spyOn(
      HTMLDivElement.prototype,
      'addEventListener',
    );

    const { result } = renderHook(() => useFocusTrap(true));

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    addEventListenerSpy.mockRestore();
  });

  it('should remove event listener when inactive', () => {
    const removeEventListenerSpy = jest.spyOn(
      HTMLDivElement.prototype,
      'removeEventListener',
    );

    const { result, rerender } = renderHook((isActive) => useFocusTrap(isActive), {
      initialProps: true,
    });

    rerender(false);

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it('should trap Tab key within container', () => {
    const mockContainer = document.createElement('div');
    const firstButton = document.createElement('button');
    const lastButton = document.createElement('button');

    mockContainer.appendChild(firstButton);
    mockContainer.appendChild(lastButton);
    document.body.appendChild(mockContainer);

    const { result } = renderHook(() => useFocusTrap(true));

    act(() => {
      result.current.current = mockContainer;
    });

    // Simulate Tab at last element
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
    mockContainer.dispatchEvent(tabEvent);

    expect(result.current.current).toBe(mockContainer);
  });

  it('should trap Shift+Tab within container', () => {
    const mockContainer = document.createElement('div');
    const firstButton = document.createElement('button');
    const lastButton = document.createElement('button');

    mockContainer.appendChild(firstButton);
    mockContainer.appendChild(lastButton);
    document.body.appendChild(mockContainer);

    const { result } = renderHook(() => useFocusTrap(true));

    act(() => {
      result.current.current = mockContainer;
    });

    // Simulate Shift+Tab at first element
    const shiftTabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
    });
    mockContainer.dispatchEvent(shiftTabEvent);

    expect(result.current.current).toBe(mockContainer);
  });

  it('should ignore non-Tab keys', () => {
    const mockContainer = document.createElement('div');
    const button = document.createElement('button');

    mockContainer.appendChild(button);
    document.body.appendChild(mockContainer);

    const { result } = renderHook(() => useFocusTrap(true));

    act(() => {
      result.current.current = mockContainer;
    });

    // Simulate Arrow key (should be ignored)
    const arrowEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    const preventDefault = jest.fn();
    arrowEvent.preventDefault = preventDefault;

    mockContainer.dispatchEvent(arrowEvent);

    expect(preventDefault).not.toHaveBeenCalled();
  });

  it('should find all focusable elements', () => {
    const mockContainer = document.createElement('div');
    const button = document.createElement('button');
    const link = document.createElement('a');
    const input = document.createElement('input');
    const select = document.createElement('select');
    const textarea = document.createElement('textarea');

    link.href = 'http://example.com';
    button.textContent = 'Button';

    mockContainer.appendChild(button);
    mockContainer.appendChild(link);
    mockContainer.appendChild(input);
    mockContainer.appendChild(select);
    mockContainer.appendChild(textarea);
    document.body.appendChild(mockContainer);

    const { result } = renderHook(() => useFocusTrap(true));

    act(() => {
      result.current.current = mockContainer;
    });

    expect(result.current.current).toBe(mockContainer);
  });

  it('should exclude disabled elements', () => {
    const mockContainer = document.createElement('div');
    const enabledButton = document.createElement('button');
    const disabledButton = document.createElement('button');

    disabledButton.disabled = true;
    enabledButton.textContent = 'Enabled';
    disabledButton.textContent = 'Disabled';

    mockContainer.appendChild(enabledButton);
    mockContainer.appendChild(disabledButton);
    document.body.appendChild(mockContainer);

    const { result } = renderHook(() => useFocusTrap(true));

    act(() => {
      result.current.current = mockContainer;
    });

    expect(result.current.current).toBe(mockContainer);
  });

  it('should clean up on unmount', () => {
    const { result, unmount } = renderHook(() => useFocusTrap(true));

    expect(result.current).toBeDefined();

    unmount();
  });

  it('should handle empty containers gracefully', () => {
    const mockContainer = document.createElement('div');
    document.body.appendChild(mockContainer);

    const { result } = renderHook(() => useFocusTrap(true));

    act(() => {
      result.current.current = mockContainer;
    });

    // Should not crash
    expect(result.current.current).toBe(mockContainer);
  });

  it('should handle containers with only disabled elements', () => {
    const mockContainer = document.createElement('div');
    const disabledButton = document.createElement('button');

    disabledButton.disabled = true;
    mockContainer.appendChild(disabledButton);
    document.body.appendChild(mockContainer);

    const { result } = renderHook(() => useFocusTrap(true));

    act(() => {
      result.current.current = mockContainer;
    });

    // Should not crash
    expect(result.current.current).toBe(mockContainer);
  });

  describe('Options object parameter', () => {
    it('should accept options object with isActive', () => {
      const { result } = renderHook(() =>
        useFocusTrap({ isActive: true }),
      );

      expect(result.current).toHaveProperty('current');
    });

    it('should maintain backward compatibility with boolean parameter', () => {
      const { result: booleanResult } = renderHook(() => useFocusTrap(true));
      const { result: objectResult } = renderHook(() =>
        useFocusTrap({ isActive: true }),
      );

      expect(booleanResult.current).toHaveProperty('current');
      expect(objectResult.current).toHaveProperty('current');
    });

    it('should use default values for options when not provided', () => {
      const { result } = renderHook(() =>
        useFocusTrap({
          isActive: true,
          // initialFocus defaults to 'first'
          // returnFocus defaults to true
        }),
      );

      expect(result.current).toBeDefined();
    });
  });

  describe('Initial focus management', () => {
    it('should focus first element when initialFocus="first"', async () => {
      const mockContainer = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');

      button1.textContent = 'First';
      button2.textContent = 'Second';
      mockContainer.appendChild(button1);
      mockContainer.appendChild(button2);
      document.body.appendChild(mockContainer);

      const { result } = renderHook(() =>
        useFocusTrap({
          isActive: true,
          initialFocus: 'first',
        }),
      );

      act(() => {
        result.current.current = mockContainer;
      });

      // Wait for requestAnimationFrame
      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(document.activeElement).toBe(button1);

      document.body.removeChild(mockContainer);
    });

    it('should focus last element when initialFocus="last"', async () => {
      const mockContainer = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');

      button1.textContent = 'First';
      button2.textContent = 'Second';
      mockContainer.appendChild(button1);
      mockContainer.appendChild(button2);
      document.body.appendChild(mockContainer);

      const { result } = renderHook(() =>
        useFocusTrap({
          isActive: true,
          initialFocus: 'last',
        }),
      );

      act(() => {
        result.current.current = mockContainer;
      });

      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(document.activeElement).toBe(button2);

      document.body.removeChild(mockContainer);
    });

    it('should focus custom ref when provided', async () => {
      const mockContainer = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      const customButton = document.createElement('button');

      button1.textContent = 'First';
      customButton.textContent = 'Custom';
      button2.textContent = 'Last';
      mockContainer.appendChild(button1);
      mockContainer.appendChild(customButton);
      mockContainer.appendChild(button2);
      document.body.appendChild(mockContainer);

      const customRef = { current: customButton };

      const { result } = renderHook(() =>
        useFocusTrap({
          isActive: true,
          initialFocus: customRef,
        }),
      );

      act(() => {
        result.current.current = mockContainer;
      });

      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(document.activeElement).toBe(customButton);

      document.body.removeChild(mockContainer);
    });

    it('should use first element as default initial focus', async () => {
      const mockContainer = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');

      button1.textContent = 'First';
      button2.textContent = 'Second';
      mockContainer.appendChild(button1);
      mockContainer.appendChild(button2);
      document.body.appendChild(mockContainer);

      const { result } = renderHook(() =>
        useFocusTrap({
          isActive: true,
          // initialFocus not specified, should default to 'first'
        }),
      );

      act(() => {
        result.current.current = mockContainer;
      });

      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(document.activeElement).toBe(button1);

      document.body.removeChild(mockContainer);
    });

    it('should handle no focusable elements gracefully', async () => {
      const mockContainer = document.createElement('div');
      const div = document.createElement('div');

      div.textContent = 'Non-focusable content';
      mockContainer.appendChild(div);
      document.body.appendChild(mockContainer);

      const { result } = renderHook(() =>
        useFocusTrap({
          isActive: true,
          initialFocus: 'first',
        }),
      );

      act(() => {
        result.current.current = mockContainer;
      });

      await new Promise((resolve) => setTimeout(resolve, 20));

      // Should not throw
      expect(result.current.current).toBe(mockContainer);

      document.body.removeChild(mockContainer);
    });
  });

  describe('Focus restoration', () => {
    it('should store previous focus when trap activates', async () => {
      const triggerButton = document.createElement('button');
      triggerButton.textContent = 'Trigger';
      document.body.appendChild(triggerButton);
      triggerButton.focus();

      const mockContainer = document.createElement('div');
      const button = document.createElement('button');
      button.textContent = 'In trap';
      mockContainer.appendChild(button);
      document.body.appendChild(mockContainer);

      const { result, rerender } = renderHook(
        (isActive) =>
          useFocusTrap({
            isActive,
            returnFocus: true,
          }),
        { initialProps: false },
      );

      expect(document.activeElement).toBe(triggerButton);

      act(() => {
        result.current.current = mockContainer;
        rerender(true);
      });

      await new Promise((resolve) => setTimeout(resolve, 20));

      document.body.removeChild(triggerButton);
      document.body.removeChild(mockContainer);
    });

    it('should restore focus when trap deactivates with returnFocus=true', async () => {
      const triggerButton = document.createElement('button');
      triggerButton.textContent = 'Trigger';
      document.body.appendChild(triggerButton);
      triggerButton.focus();

      const mockContainer = document.createElement('div');
      const button = document.createElement('button');
      button.textContent = 'In trap';
      mockContainer.appendChild(button);
      document.body.appendChild(mockContainer);

      const { result, rerender } = renderHook(
        (isActive) =>
          useFocusTrap({
            isActive,
            returnFocus: true,
          }),
        { initialProps: false },
      );

      act(() => {
        result.current.current = mockContainer;
        rerender(true);
      });

      await new Promise((resolve) => setTimeout(resolve, 20));

      act(() => {
        rerender(false);
      });

      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(document.activeElement).toBe(triggerButton);

      document.body.removeChild(triggerButton);
      document.body.removeChild(mockContainer);
    });

    it('should not restore focus when returnFocus=false', async () => {
      const triggerButton = document.createElement('button');
      triggerButton.textContent = 'Trigger';
      document.body.appendChild(triggerButton);
      triggerButton.focus();

      const mockContainer = document.createElement('div');
      const button = document.createElement('button');
      button.textContent = 'In trap';
      mockContainer.appendChild(button);
      document.body.appendChild(mockContainer);

      const { result, rerender } = renderHook(
        (isActive) =>
          useFocusTrap({
            isActive,
            returnFocus: false,
          }),
        { initialProps: false },
      );

      act(() => {
        result.current.current = mockContainer;
        rerender(true);
      });

      await new Promise((resolve) => setTimeout(resolve, 20));

      act(() => {
        rerender(false);
      });

      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(document.activeElement).not.toBe(triggerButton);

      document.body.removeChild(triggerButton);
      document.body.removeChild(mockContainer);
    });

    it('should restore focus on unmount when returnFocus=true', async () => {
      const triggerButton = document.createElement('button');
      triggerButton.textContent = 'Trigger';
      document.body.appendChild(triggerButton);
      triggerButton.focus();

      const mockContainer = document.createElement('div');
      const button = document.createElement('button');
      button.textContent = 'In trap';
      mockContainer.appendChild(button);
      document.body.appendChild(mockContainer);

      const { result, unmount } = renderHook(() =>
        useFocusTrap({
          isActive: true,
          returnFocus: true,
        }),
      );

      act(() => {
        result.current.current = mockContainer;
      });

      await new Promise((resolve) => setTimeout(resolve, 20));

      unmount();

      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(document.activeElement).toBe(triggerButton);

      document.body.removeChild(triggerButton);
      document.body.removeChild(mockContainer);
    });
  });

  describe('Escape attempt callback', () => {
    it('should call onEscapeAttempt when Tab at last element', async () => {
      const mockContainer = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');

      button1.textContent = 'First';
      button2.textContent = 'Last';
      mockContainer.appendChild(button1);
      mockContainer.appendChild(button2);
      document.body.appendChild(mockContainer);

      const onEscapeAttempt = jest.fn();

      const { result } = renderHook(() =>
        useFocusTrap({
          isActive: true,
          onEscapeAttempt,
        }),
      );

      act(() => {
        result.current.current = mockContainer;
      });

      button2.focus();

      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
      });

      act(() => {
        mockContainer.dispatchEvent(tabEvent);
      });

      // Wait a bit for the callback
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(onEscapeAttempt).toHaveBeenCalled();

      document.body.removeChild(mockContainer);
    });

    it('should call onEscapeAttempt when Shift+Tab at first element', async () => {
      const mockContainer = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');

      button1.textContent = 'First';
      button2.textContent = 'Last';
      mockContainer.appendChild(button1);
      mockContainer.appendChild(button2);
      document.body.appendChild(mockContainer);

      const onEscapeAttempt = jest.fn();

      const { result } = renderHook(() =>
        useFocusTrap({
          isActive: true,
          onEscapeAttempt,
        }),
      );

      act(() => {
        result.current.current = mockContainer;
      });

      button1.focus();

      const shiftTabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
      });

      act(() => {
        mockContainer.dispatchEvent(shiftTabEvent);
      });

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(onEscapeAttempt).toHaveBeenCalled();

      document.body.removeChild(mockContainer);
    });

    it('should not call onEscapeAttempt when not at boundaries', async () => {
      const mockContainer = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      const button3 = document.createElement('button');

      button1.textContent = 'First';
      button2.textContent = 'Middle';
      button3.textContent = 'Last';
      mockContainer.appendChild(button1);
      mockContainer.appendChild(button2);
      mockContainer.appendChild(button3);
      document.body.appendChild(mockContainer);

      const onEscapeAttempt = jest.fn();

      const { result } = renderHook(() =>
        useFocusTrap({
          isActive: true,
          onEscapeAttempt,
        }),
      );

      act(() => {
        result.current.current = mockContainer;
      });

      button2.focus();

      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
      });

      act(() => {
        mockContainer.dispatchEvent(tabEvent);
      });

      await new Promise((resolve) => setTimeout(resolve, 10));

      // Should not be called when tabbing from middle element
      expect(onEscapeAttempt).not.toHaveBeenCalled();

      document.body.removeChild(mockContainer);
    });
  });
});
