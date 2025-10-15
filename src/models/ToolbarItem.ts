import { ReactNode } from 'react';

export type ToolbarItem = {
  /**
   * Icon to be displayed in the toolbar item.
   */
  icon?: ReactNode;
  /**
   * Unique identifier for the toolbar item.
   */
  id?: string;
  /**
   * Label text for the toolbar item.
   */
  label?: string;
  /**
   * Name of the toolbar item.
   */
  name: string;
  /**
   * Callback function to be called when the toolbar item is selected.
   * @param id - The id of the selected toolbar item.
   * @param name - The name of the selected toolbar item.
   */
  onSelect: (id: string, name: string) => void;
  /**
   * Whether this toolbar item can be minimized/maximized.
   */
  minimizable?: boolean;
  /**
   * Current minimized state of the toolbar item.
   */
  isMinimized?: boolean;
  /**
   * Callback function to be called when minimize/maximize is toggled.
   * @param id - The id of the toolbar item.
   * @param isMinimized - The new minimized state.
   */
  onToggleMinimize?: (id: string, isMinimized: boolean) => void;
};
