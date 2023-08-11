/**
 * Represents the model for controlling the timeline.
 */
export interface TimelineControlModel {
  // Index of the active timeline item.
  activeTimelineItem?: number;

  // Indicates whether the left control is disabled.
  disableLeft: boolean;

  // Indicates whether the right control is disabled.
  disableRight: boolean;

  // Unique identifier for the control.
  id?: string;

  // Indicates whether the dark mode is enabled.
  isDark?: boolean;

  // Click event handler for moving to the first item.
  onFirst: () => void;

  // Click event handler for moving to the last item.
  onLast: () => void;

  // Click event handler for moving to the next item.
  onNext: () => void;

  // Click event handler for pausing the slide show.
  onPaused?: () => void;

  // Click event handler for moving to the previous item.
  onPrevious: () => void;

  // Click event handler for replaying the slide show.
  onReplay?: () => void;

  // Click event handler for toggling dark mode.
  onToggleDarkMode?: () => void;

  // Indicates whether slide show mode is enabled.
  slideShowEnabled?: boolean;

  // Indicates whether the slide show is currently running.
  slideShowRunning?: boolean;
}
