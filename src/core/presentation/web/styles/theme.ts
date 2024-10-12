import { createTheme, ThemeOptions } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from 'next-themes'; // import: next-themes 0.2.5
import { create } from 'zustand'; // import: zustand 5.0.0-rc.2
import { createContext, useContext } from 'react'; // import: react 18.3.1
import { darkTheme as sharedDarkTheme } from 'src/shared/ui-components/theme'; // import: src/shared/ui-components/theme
import { lightTheme as sharedLightTheme } from 'src/shared/ui-components/theme'; // import: src/shared/ui-components/theme

// Define custom typography styles
const typography = {
  fontFamily: ['Roboto', 'sans-serif'].join(','),
  fontSize: 16,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontSize: '3rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: 1.6,
  },
  h6: {
    fontSize: '0.875rem',
    fontWeight: 700,
    lineHeight: 1.75,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.57,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.43,
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.66,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: 1.66,
  },
};

// Define custom theme options
const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light', // Default to light mode
    primary: {
      main: '#007bff', // Primary color
    },
    secondary: {
      main: '#6c757d', // Secondary color
    },
    error: {
      main: '#dc3545', // Error color
    },
    warning: {
      main: '#ffc107', // Warning color
    },
    info: {
      main: '#17a2b8', // Info color
    },
    success: {
      main: '#28a745', // Success color
    },
    background: {
      default: '#f8f9fa', // Default background color
      paper: '#ffffff', // Paper background color
    },
    text: {
      primary: '#212529', // Primary text color
      secondary: '#495057', // Secondary text color
      disabled: '#6c757d', // Disabled text color
    },
  },
  typography,
  shape: {
    borderRadius: 4, // Default border-radius
  },
  components: {
    // Customize MUI components here
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4, // Custom border-radius for buttons
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 4, // Custom border-radius for text fields
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Custom border-radius for cards
        },
      },
    },
  },
};

// Create a custom MUI theme
const theme = createTheme(themeOptions);

// Define a context for the theme
export const ThemeContext = createContext(theme);

// Create a zustand store for theme management
export const useThemeStore = create((set) => ({
  theme: theme, // Initial theme state
  setTheme: (newTheme: ThemeOptions) => {
    // Update the theme state
    set({ theme: newTheme });
  },
}));

// Custom hook to access the theme
export const useCustomTheme = () => {
  // Get the current theme from the zustand store
  const theme = useThemeStore((state) => state.theme);
  // Get the system theme from next-themes
  const systemTheme = useTheme();
  // Combine the MUI theme and system theme
  return {
    ...theme,
    systemTheme,
  };
};

export default theme;