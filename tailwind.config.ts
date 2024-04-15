import {Config} from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontWeight: {
        book: '450',
      },
      colors: {
        custom: {
          primary: '#0e9291',
          // primary: '#8D150E',
          // primary: '#7d756f',
          gray: '#4c4c4c',
          'light-gray': '#EBEBEB',
        },
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
  ],
}

export default config
