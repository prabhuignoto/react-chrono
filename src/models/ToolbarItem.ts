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
};
