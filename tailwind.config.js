/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-teal': '#2A6F7F',
        'secondary-teal': '#3A9CA8',
        'accent-cyan': '#00E5FF',
        'surface': '#FFFFFF',
        'support-gray': '#E0E5E9',
        'alert-coral': '#FF6B6B',
        'success-green': '#4CAF50',
        'premium-gold': '#FFD166',
        // Dark mode variants
        'dark-primary': '#3A9CA8',
        'dark-bg': '#0F1419',
        'dark-surface': '#1C2128',
        'dark-text': '#E5E7EB',
        'dark-support': '#374151',
        'dark-alert': '#F87171',
        'dark-success': '#10B981',
        'dark-premium': '#F59E0B',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #2A6F7F 0%, #3A9CA8 100%)',
        'gradient-accent': 'linear-gradient(90deg, #3A9CA8 0%, #00E5FF 100%)',
        'gradient-dark': 'linear-gradient(90deg, #3A9CA8 0%, #63B3B3 100%)'
      },
      boxShadow: {
        'enhanced': '0 10px 25px -5px rgba(42, 111, 127, 0.2), 0 8px 10px -6px rgba(42, 111, 127, 0.1)',
        'glow': '0 0 20px rgba(58, 156, 168, 0.6)',
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke',
      }
    },
  },
  plugins: [],
};