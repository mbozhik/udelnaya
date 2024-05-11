import type {Config} from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontWeight: {
        book: '450',
      },
      colors: {
        custom: {
          // primary: '#0e9291',
          primary: '#991C2F',
          gray: '#4c4c4c',
          'light-gray': '#f4f4f4',
          'dirty-white': '#e4e4e4',
        },
      },
      boxShadow: {
        card: '0px 5px 15px -3px #00000040',
        'mini-card': '0px 5px 15px -3px #00000030',
        nav: '0px 13px 32px -19px #00000070',
        'nav-mobile': '0px 3px 12px 2px #00000050;',
      },
      textShadow: {
        title: '0 1px 7px #00000070',
        text: '0 1px 10px #00000080',
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    screens: {
      xl: {max: '1536px'},
      lg: {max: '1024px'},
      sm: {max: '768px'},
      xs: {max: '350px'},
    },
  },
  plugins: [
    plugin(function sizePlugin(api) {
      api.matchUtilities({s: (value: string) => ({width: value, height: value})}, {values: api.theme('width')})
    }),
    plugin(function ({matchUtilities, theme}) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        {values: theme('textShadow')},
      )
    }),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config

export default config
