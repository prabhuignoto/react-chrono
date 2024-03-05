import { fireEvent } from '@testing-library/react';
import { getDefaultThemeOrDark } from '@utils/index';
import { customRender, providerProps } from 'src/components/common/test';
import { vi } from 'vitest';
import { LayoutSwitcher } from '../timeline-popover-elements';

describe('LayoutSwitcher Component', () => {
  const onUpdateTimelineMode = vi.fn();
  const theme = getDefaultThemeOrDark();
  const isDarkMode = false;
  const position = 'top';

  test('Renders correctly with vertical layout options', () => {
    const { getByText } = customRender(
      <LayoutSwitcher
        onUpdateTimelineMode={onUpdateTimelineMode}
        theme={theme}
        mode="VERTICAL"
        isDarkMode={isDarkMode}
        position={position}
        isMobile={false}
      />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );

    // Add your assertions here
    expect(getByText('Change layout')).toBeInTheDocument();

    fireEvent.click(getByText('Change layout'));

    expect(getByText('Vertical')).toBeInTheDocument();
    expect(getByText('Alternating')).toBeInTheDocument();
  });

  test('Renders correctly with horizontal layout options', () => {
    const { getByText } = customRender(
      <LayoutSwitcher
        onUpdateTimelineMode={onUpdateTimelineMode}
        theme={theme}
        mode="HORIZONTAL"
        isDarkMode={isDarkMode}
        position={position}
        isMobile={false}
      />,
      {
        providerProps: {
          ...providerProps,
        },
      },
    );

    // Add your assertions here
    expect(getByText('Change layout')).toBeInTheDocument();

    fireEvent.click(getByText('Change layout'));

    // expect(getByText('Horizontal')).toBeInTheDocument();
    // expect(getByText('Show all cards')).toBeInTheDocument();
  });

  //   test('Handles mode selection correctly', async () => {
  //     const { getByText } = customRender(
  //       <LayoutSwitcher
  //         onUpdateTimelineMode={onUpdateTimelineMode}
  //         theme={theme}
  //         mode="VERTICAL"
  //         isDarkMode={isDarkMode}
  //         position={position}
  //         isMobile={false}
  //       />,
  //       {
  //         providerProps: {
  //           ...providerProps,
  //         },
  //       },
  //     );

  //     expect(getByText('Change layout')).toBeInTheDocument();

  //     fireEvent.click(getByText('Change layout'));

  //     expect(getByText('Default')).toBeInTheDocument();

  //     // Simulate clicking on a mode option
  //     fireEvent.click(getByText('Default'));

  //     await waitFor(() => {
  //       expect(onUpdateTimelineMode).toHaveBeenCalledWith('VERTICAL');
  //     });
  //   });
  // });

  // describe('QuickJump Component', () => {
  //   const onActivateItem = vi.fn();
  //   const theme = getDefaultThemeOrDark();
  //   const isDarkMode = false;
  //   const position = 'top';
  //   const items = [
  //     { description: 'Description 1', id: '1', title: 'Item 1' },
  //     { description: 'Description 2', id: '2', title: 'Item 2' },
  //   ];

  //   test('Renders correctly with provided items', () => {
  //     const { getByText } = customRender(
  //       <QuickJump
  //         activeItem={0}
  //         items={items}
  //         theme={theme}
  //         onActivateItem={onActivateItem}
  //         isDarkMode={isDarkMode}
  //         position={position}
  //         isMobile={false}
  //       />,
  //       {
  //         providerProps: {
  //           ...providerProps,
  //         },
  //       },
  //     );

  //     // Add your assertions here

  //     expect(getByText('Jump to')).toBeInTheDocument();

  //     fireEvent.click(getByText('Jump to'));

  //     expect(getByText('Item 1')).toBeInTheDocument();
  //     expect(getByText('Item 2')).toBeInTheDocument();
  //   });

  //   test('Handles item activation correctly', () => {
  //     const { getByText } = customRender(
  //       <QuickJump
  //         activeItem={0}
  //         items={items}
  //         theme={theme}
  //         onActivateItem={onActivateItem}
  //         isDarkMode={isDarkMode}
  //         position={position}
  //         isMobile={false}
  //       />,
  //       {
  //         providerProps: {
  //           ...providerProps,
  //         },
  //       },
  //     );

  //     expect(getByText('Jump to')).toBeInTheDocument();

  //     fireEvent.click(getByText('Jump to'));

  //     // Simulate clicking on an item
  //     fireEvent.click(getByText('Item 1'));

  //     expect(onActivateItem).toHaveBeenCalledWith('1');
  //   });
});
