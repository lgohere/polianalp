import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      teal: string;
      tealLight: string;
      tealDark: string;
      peach: string;
      peachLight: string;
      peachDark: string;
      beige: string;
      gold: string;
      gray: string;
      grayLight: string;
      grayDark: string;
      text: string;
      background: string;
    };
    fonts: {
      primary: string;
      secondary: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      display: string;
    };
    fontWeights: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeights: {
      body: number;
      heading: number;
      tight: number;
    };
    space: {
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      8: string;
      10: string;
      12: string;
      16: string;
      20: string;
      24: string;
      32: string;
      40: string;
      48: string;
      56: string;
      64: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    radii: {
      none: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    transitions: {
      default: string;
      fast: string;
      slow: string;
    };
    zIndices: {
      hide: number;
      auto: string;
      base: number;
      docked: number;
      dropdown: number;
      sticky: number;
      banner: number;
      overlay: number;
      modal: number;
      popover: number;
      tooltip: number;
    };
  }
}

const theme: DefaultTheme = {
  colors: {
    teal: '#68BFB7',
    tealLight: 'rgba(104, 191, 183, 0.2)',
    tealDark: '#4B9993',
    peach: '#FFB997',
    peachLight: '#FCF0E4',
    peachDark: '#FF9B73',
    beige: '#F7EBE1',
    gold: '#FFD56F',
    gray: '#718096',
    grayLight: '#E2E8F0',
    grayDark: '#2D3748',
    text: '#4A5568',
    background: '#FFFFFF',
  },
  fonts: {
    primary: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'Playfair Display', Georgia, 'Times New Roman', Times, serif",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    display: 'clamp(2.5rem, 5vw, 4rem)',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    body: 1.6,
    heading: 1.2,
    tight: 1.1,
  },
  space: {
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
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '1rem',
    full: '9999px',
  },
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
  },
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
};

export default theme;
