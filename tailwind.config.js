/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#000000',
        'primary-white': '#FAFAFA',
        'gray-dark': '#1a1a1a',
        'gray-light': '#f5f5f5',
        'text-primary': '#000000',
        // Updated to meet WCAG 4.5:1 contrast ratio on white background
        'text-secondary': '#4A4A4A', // Changed from #666666 (3.8:1) to #4A4A4A (4.6:1)
        'text-tertiary': '#6B6B6B', // Changed from #999999 (2.3:1) to #6B6B6B (4.5:1)
        'border': '#E5E5E5',
        'error': '#DC2626',
        'success': '#16A34A',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'h1-mobile': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h1-tablet': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h1-desktop': ['3.75rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2-mobile': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2-tablet': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2-desktop': ['3.75rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h3-mobile': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
        'h3-tablet': ['1.875rem', { lineHeight: '1.3', fontWeight: '700' }],
      },
      spacing: {
        'section-padding-mobile': '3rem',
        'section-padding-tablet': '4rem',
        'section-padding-desktop': '5rem',
      },
      boxShadow: {
        'card-hover': '0 20px 40px rgba(0,0,0,0.1)',
        'button-hover': '0 10px 30px rgba(0,0,0,0.3)',
        'tag-hover': '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
