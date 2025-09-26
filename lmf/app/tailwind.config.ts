import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        suiBlue: '#6c63ff',
        suiViolet: '#9a4dff',
        suiDark: '#0b1024',
        suiMid: '#1a1440',
      },
    },
  },
  plugins: [],
} satisfies Config

