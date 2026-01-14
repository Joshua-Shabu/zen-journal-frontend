module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'zen-white': '#FAFAFA',
        'zen-gray': '#F5F5F5',
        'zen-stone': '#E5E5E5',
        'zen-charcoal': '#374151',
        'zen-ink': '#1F2937',
        'zen-accent': '#92400E',
        'zen-sakura': '#FEE2E2',
        'zen-bamboo': '#D1FAE5'
      },
      fontFamily: {
        'sans': ['Inter', 'Noto Sans JP', 'system-ui', 'sans-serif'],
        'serif': ['Noto Serif JP', 'serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      borderRadius: {
        'xl': '0.75rem'
      },
      boxShadow: {
        'zen': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }
    },
  },
  plugins: [],
}
