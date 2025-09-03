import { createTheme } from '@vanilla-extract/css';
import { tokens } from './index.css';

// Light theme implementation
export const lightTheme = createTheme(tokens, {
  primitive: {
    color: {
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      green: {
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
      },
      red: {
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
      },
      yellow: {
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
      },
    },
    spacing: {
      0: '0',
      1: '0.25rem',  // 4px
      2: '0.5rem',   // 8px
      3: '0.75rem',  // 12px
      4: '1rem',     // 16px
      5: '1.25rem',  // 20px
      6: '1.5rem',   // 24px
      8: '2rem',     // 32px
      10: '2.5rem',  // 40px
      12: '3rem',    // 48px
      16: '4rem',    // 64px
      20: '5rem',    // 80px
      24: '6rem',    // 96px
    },
    fontSize: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.8',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    borderRadius: {
      none: '0',
      sm: '0.25rem',   // 4px
      md: '0.5rem',    // 8px
      lg: '0.75rem',   // 12px
      xl: '1rem',      // 16px
      '2xl': '1.5rem', // 24px
      full: '9999px',
    },
    shadow: {
      xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    zIndex: {
      base: '0',
      elevated: '10',
      sticky: '20',
      overlay: '30',
      modal: '40',
      tooltip: '50',
    },
    transition: {
      duration: {
        instant: '0ms',
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      easing: {
        linear: 'linear',
        ease: 'ease',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  semantic: {
    color: {
      text: {
        primary: '#111827',    // gray.900
        secondary: '#374151',  // gray.700
        muted: '#6b7280',      // gray.500
        inverse: '#ffffff',    // white
      },
      background: {
        primary: '#ffffff',    // white
        secondary: '#f9fafb',  // gray.50
        elevated: '#ffffff',   // white
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      interactive: {
        primary: '#2563eb',      // blue.600
        primaryHover: '#1d4ed8', // blue.700
        primaryActive: '#1e40af', // blue.800
        secondary: '#e5e7eb',    // gray.200
        secondaryHover: '#d1d5db', // gray.300
        muted: '#f3f4f6',        // gray.100
        mutedHover: '#e5e7eb',   // gray.200
      },
      border: {
        default: '#e5e7eb',      // gray.200
        muted: '#f3f4f6',        // gray.100
        emphasis: '#d1d5db',     // gray.300
        interactive: '#2563eb',   // blue.600
      },
      status: {
        success: '#22c55e',  // green.500
        warning: '#eab308',  // yellow.500
        error: '#ef4444',    // red.500
        info: '#3b82f6',     // blue.500
      },
      icon: {
        default: '#6b7280',  // gray.500
        muted: '#9ca3af',    // gray.400
        emphasis: '#374151', // gray.700
      },
    },
    spacing: {
      xs: '0.25rem',   // 4px
      sm: '0.5rem',    // 8px
      md: '1rem',      // 16px
      lg: '1.5rem',    // 24px
      xl: '2rem',      // 32px
      '2xl': '3rem',   // 48px
      '3xl': '4rem',   // 64px
    },
    typography: {
      fontSize: {
        caption: '0.75rem',   // 12px
        body: '1rem',         // 16px
        heading3: '1.125rem', // 18px
        heading2: '1.25rem',  // 20px
        heading1: '1.5rem',   // 24px
      },
      lineHeight: {
        tight: '1.2',
        normal: '1.5',
        relaxed: '1.8',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
    borderRadius: {
      sm: '0.25rem',   // 4px
      md: '0.5rem',    // 8px
      lg: '0.75rem',   // 12px
      xl: '1rem',      // 16px
      full: '9999px',
    },
    shadow: {
      card: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      cardHover: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      cardActive: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      toolbar: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      modal: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    zIndex: {
      timelineCard: '10',
      controls: '1000',
      popover: '1100',
      outline: '50',
    },
    motion: {
      duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      easing: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  component: {
    timeline: {
      line: {
        width: '2px',
        color: '#2563eb', // blue.600
      },
      point: {
        size: {
          sm: '24px',
          md: '32px',
          lg: '40px',
        },
        color: {
          active: '#2563eb',   // blue.600
          inactive: '#6b7280', // gray.500
          hover: '#1d4ed8',    // blue.700
        },
      },
      card: {
        width: {
          vertical: '85%',
          horizontal: '280px',
          min: '280px',
          max: '400px',
        },
        spacing: {
          vertical: '2rem',    // 32px
          horizontal: '1rem',  // 16px
        },
      },
    },
    toolbar: {
      height: '64px',
      padding: '1rem',     // 16px
      background: '#f1f5f9',
      button: {
        size: '36px',
        spacing: '0.5rem', // 8px
      },
    },
  },
});

// Dark theme implementation
export const darkTheme = createTheme(tokens, {
  primitive: {
    color: {
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#1f2937',   // Inverted for dark theme
        100: '#374151',
        200: '#4b5563',
        300: '#6b7280',
        400: '#9ca3af',
        500: '#d1d5db',
        600: '#e5e7eb',
        700: '#f3f4f6',
        800: '#f9fafb',
        900: '#ffffff',
      },
      blue: {
        50: '#1e3a8a',   // Darker blues for dark theme
        100: '#1e40af',
        200: '#1d4ed8',
        300: '#2563eb',
        400: '#3b82f6',
        500: '#60a5fa',
        600: '#93c5fd',
        700: '#bfdbfe',
        800: '#dbeafe',
        900: '#eff6ff',
      },
      green: {
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
      },
      red: {
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
      },
      yellow: {
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
      },
    },
    spacing: {
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.8',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    borderRadius: {
      none: '0',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      '2xl': '1.5rem',
      full: '9999px',
    },
    shadow: {
      xs: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
    },
    zIndex: {
      base: '0',
      elevated: '10',
      sticky: '20',
      overlay: '30',
      modal: '40',
      tooltip: '50',
    },
    transition: {
      duration: {
        instant: '0ms',
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      easing: {
        linear: 'linear',
        ease: 'ease',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  semantic: {
    color: {
      text: {
        primary: '#e5e7eb',    // gray.600 in dark theme
        secondary: '#d1d5db',  // gray.500 in dark theme
        muted: '#9ca3af',      // gray.400 in dark theme
        inverse: '#111827',    // gray.900
      },
      background: {
        primary: '#0b0f19',    // Very dark blue-gray
        secondary: '#111827',  // gray.900
        elevated: '#1f2937',   // gray.800
        overlay: 'rgba(0, 0, 0, 0.7)',
      },
      interactive: {
        primary: '#60a5fa',      // blue.400
        primaryHover: '#93c5fd', // blue.300
        primaryActive: '#bfdbfe', // blue.200
        secondary: '#374151',    // gray.700
        secondaryHover: '#4b5563', // gray.600
        muted: '#1f2937',        // gray.800
        mutedHover: '#374151',   // gray.700
      },
      border: {
        default: 'rgba(255, 255, 255, 0.1)',
        muted: 'rgba(255, 255, 255, 0.05)',
        emphasis: 'rgba(255, 255, 255, 0.2)',
        interactive: '#60a5fa', // blue.400
      },
      status: {
        success: '#22c55e',
        warning: '#eab308',
        error: '#ef4444',
        info: '#60a5fa',
      },
      icon: {
        default: '#9ca3af',  // gray.400
        muted: '#6b7280',    // gray.500
        emphasis: '#f3f4f6', // gray.100
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    typography: {
      fontSize: {
        caption: '0.75rem',
        body: '1rem',
        heading3: '1.125rem',
        heading2: '1.25rem',
        heading1: '1.5rem',
      },
      lineHeight: {
        tight: '1.2',
        normal: '1.5',
        relaxed: '1.8',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      full: '9999px',
    },
    shadow: {
      card: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
      cardHover: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
      cardActive: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
      toolbar: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
      modal: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
    },
    zIndex: {
      timelineCard: '10',
      controls: '1000',
      popover: '1100',
      outline: '50',
    },
    motion: {
      duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      easing: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  component: {
    timeline: {
      line: {
        width: '2px',
        color: '#60a5fa', // blue.400 for dark theme
      },
      point: {
        size: {
          sm: '24px',
          md: '32px',
          lg: '40px',
        },
        color: {
          active: '#60a5fa',   // blue.400
          inactive: '#9ca3af', // gray.400
          hover: '#93c5fd',    // blue.300
        },
      },
      card: {
        width: {
          vertical: '85%',
          horizontal: '280px',
          min: '280px',
          max: '400px',
        },
        spacing: {
          vertical: '2rem',
          horizontal: '1rem',
        },
      },
    },
    toolbar: {
      height: '64px',
      padding: '1rem',
      background: '#111827', // gray.900
      button: {
        size: '36px',
        spacing: '0.5rem',
      },
    },
  },
});

// Default theme (light)
export const defaultTheme = lightTheme;

// Legacy theme classes for compatibility (to be removed gradually)
export const lightThemeClass = lightTheme;
export const darkThemeClass = darkTheme;