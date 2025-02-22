import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'times8': {
          'purple': '#c026d3',
          'purple-light': '#d946ef',
          'purple-dark': '#a21caf',
        },
        // Dark mode and light mode colors
        'dark': {
          'bg-primary': '#121212',
          'bg-secondary': '#1e1e1e',
          'bg-tertiary': '#252525',
          'border': '#333333',
          'text-primary': '#ffffff',
          'text-secondary': '#a3a3a3',
        },
        'light': {
          'bg-primary': '#ffffff',
          'bg-secondary': '#f3f4f6',
          'bg-tertiary': '#e5e7eb',
          'border': '#d1d5db',
          'text-primary': '#111827',
          'text-secondary': '#4b5563',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      // Custom spacing values if needed
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      // Animation
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shine': 'shine 1.5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { filter: 'blur(5px) brightness(1)' },
          '100%': { filter: 'blur(5px) brightness(1.3)' },
        },
        shine: {
          '100%': { left: '125%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      // Box shadow for glowing effects
      boxShadow: {
        'glow-purple': '0 0 15px 5px rgba(192, 38, 211, 0.5)',
        'glow-white': '0 0 15px 5px rgba(255, 255, 255, 0.15)',
      },
      rotate: {
        '135': '135deg',
        '-135': '-135deg',
      },
      skew: {
        '30': '30deg',
        '-30': '-30deg',
      },

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
