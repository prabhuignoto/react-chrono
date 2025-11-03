/**
 * Represents the model for controlling the timeline.
 */
export interface TimelineControlModel {
  // Index of the active timeline item.
  activeTimelineItem?: number;

  // Indicates whether the left control is disabled.
  disableLeft?: boolean;

  // Indicates whether the right control is disabled.
  disableRight?: boolean;

  // Unique identifier for the control.
  id?: string;

  // Indicates whether the dark mode is enabled.
  isDark?: boolean;

  // Click event handler for moving to the first item.
  onFirst?: (event?: React.MouseEvent | React.KeyboardEvent) => void;

  // Click event handler for moving to the last item.
  onLast?: (event?: React.MouseEvent | React.KeyboardEvent) => void;

  // Click event handler for moving to the next item.
  onNext?: (event?: React.MouseEvent | React.KeyboardEvent) => void;

  // Click event handler for pausing the slide show.
  onPaused?: (event?: React.MouseEvent) => void;

  // Click event handler for moving to the previous item.
  onPrevious?: (event?: React.MouseEvent | React.KeyboardEvent) => void;

  // Click event handler for replaying the slide show.
  onReplay?: (event?: React.MouseEvent) => void;

  // Click event handler for toggling dark mode.
  onToggleDarkMode?: (event?: React.MouseEvent) => void;

  // Indicates whether slide show mode is enabled.
  slideShowEnabled?: boolean;

  // Indicates whether the slide show is currently running.
  slideShowRunning?: boolean;

  // Total number of items in the timeline.
  totalItems?: number;
}
