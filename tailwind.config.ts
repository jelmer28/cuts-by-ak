import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        'bg-soft': '#131313',
        'bg-card': '#181818',
        ink: '#ffffff',
        'ink-soft': '#f5f5f5',
        muted: '#8a8a8a',
        'muted-dim': '#5a5a5a',
        line: '#1f1f1f',
        'line-soft': '#2a2a2a',
        accent: '#d4af6a',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Times New Roman', 'serif'],
        body: ['var(--font-body)', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'scroll-pulse': 'scrollPulse 2.5s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scrollPulse: {
          '0%, 100%': { transform: 'scaleY(0.3)', transformOrigin: 'top', opacity: '0.3' },
          '50%': { transform: 'scaleY(1)', opacity: '1' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
