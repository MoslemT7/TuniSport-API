/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add this to enable Tailwind in your components
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E50914',       // Tunisian red
        secondary: '#2E2E3A',     // Steel gray
        dark: '#0B0F1A',          // Midnight dark
        light: '#F8F9FA',         // Light background
        muted: '#A0A0A0',         // For subtle labels
        border: '#E0E0E0',        // Light border gray
        accent: '#FFC107',        // Accent color
        success: '#28A745',       // Success green
        error: '#DC3545',         // Error red
      },
      fontFamily: {
        sans: ['Lexend Deca', 'Helvetica', 'Arial', 'sans-serif']
      },
      spacing: {
        'nav-h': '64px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '40px',
        '3xl': '48px',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};

