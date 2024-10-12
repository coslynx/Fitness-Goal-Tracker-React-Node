/**
 * @file src/tailwind.config.js
 * 
 * This file configures Tailwind CSS for the Fitness Goal Tracker MVP. It defines the design system, color palette, typography, and other visual aspects of the application. 
 * 
 * It integrates with other components:
 * - `src/pages/**/*.{js,ts,jsx,tsx,mdx}`: Applies Tailwind CSS styles to all React components and pages. 
 * - `src/components/**/*.{js,ts,jsx,tsx,mdx}`:  Applies Tailwind CSS styles to all reusable UI components. 
 * - `src/styles/globals.css`:  Imports Tailwind CSS base styles.
 * 
 * The file implements the following features:
 * - Responsive Design:  Enables styles to adapt to different screen sizes and devices.
 * - Custom Colors: Defines a custom color palette for branding.
 * - Typography:  Sets up typography styles, including font families and weights.
 * - Spacing and Layout:  Defines spacing and layout utilities.
 * - Component Customization:  Allows for customization of pre-defined Tailwind components.
 * 
 * The file follows these design patterns:
 * - Configuration Object: Uses a configuration object to define Tailwind settings. 
 * 
 * The file supports the following user stories:
 * - As a user, I want the application to have a visually appealing and consistent design. 
 * - As a user, I want the application to be responsive and work well across different devices.
 * - As a user, I want the application to have a unique and memorable brand identity.
 */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#007bff', // Example primary color
        'secondary': '#6c757d', // Example secondary color
        'success': '#28a745', // Example success color
        'danger': '#dc3545', // Example danger color
        'warning': '#ffc107', // Example warning color
        'info': '#17a2b8', // Example info color
        'light': '#f8f9fa', // Example light color
        'dark': '#343a40', // Example dark color
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'], // Example sans-serif font
        'serif': ['Merriweather', 'serif'], // Example serif font
      },
      fontSize: {
        'xxs': '0.625rem', // Example extra small font size
        'xs': '0.75rem', // Example extra small font size
        'sm': '0.875rem', // Example small font size
        'md': '1rem', // Example medium font size
        'lg': '1.125rem', // Example large font size
        'xl': '1.25rem', // Example extra large font size
        '2xl': '1.5rem', // Example double extra large font size
        '3xl': '1.875rem', // Example triple extra large font size
        '4xl': '2.25rem', // Example quadruple extra large font size
        '5xl': '3rem', // Example five times extra large font size
        '6xl': '4rem', // Example six times extra large font size
        '7xl': '5rem', // Example seven times extra large font size
      },
    },
  },
  plugins: [],
}