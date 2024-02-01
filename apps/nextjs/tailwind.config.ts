/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {Config} from "tailwindcss";
import plugin from 'tailwindcss/plugin'
// @ts-ignore

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      colors: {
        /* Grey */
        'grey11': "#19181B",
        'grey10': "#211F23",
        'grey9': "#262428",
        'grey8': "#2B292E",
        'grey7': "#333036",
        'grey6': "#47444B",
        'grey5': "#57525B",
        'grey4': "#807986",
        'grey3': "#CCC9CF",
        'grey2': "#E6E5E7",
        'grey1': "#FFFFFF",

        /* Green */
        'green7': "#194D1E",
        'green6': "#26732D",
        'green5': "#40BF4A",
        'green4': "#66CC6F",
        'green3': "#B3E5B7",
        'green2': "#D9F2DB",
        'green1': "#ECF9ED",

        /* Blue */
        'blue7': "#0A335C",
        'blue6': "#1466B8",
        'blue5': "#1A80E5",
        'blue4': "#4799EB",
        'blue3': "#A3CCF5",
        'blue2': "#D1E5FA",
        'blue1': "#E8F2FD",

        /* Teal */
        'teal7': "#1F473A",
        'teal6': "#3D8F74",
        'teal5': "#4DB290",
        'teal4': "#70C2A7",
        'teal3': "#B8E0D3",
        'teal2': "#DBF0E9",
        'teal1': "#EDF8F4",

        /* Burgundy */
        'burgundy7': "#411F47",
        'burgundy6': "#813D8F",
        'burgundy5': "#A14CB2",
        'burgundy4': "#B470C2",
        'burgundy3': "#DAB8E0",
        'burgundy2': "#ECDBF0",
        'burgundy1': "#F6EDF8",

        /* Red */
        'red7': "#5C0A0A",
        'red6': "#B81414",
        'red5': "#E51A1A",
        'red4': "#EB4747",
        'red3': "#F07575",
        'red2': "#F5A3A3",
        'red1': "#FDF1F1",

        /* Yellow */
        'yellow7': "#664400",
        'yellow6': "#996600",
        'yellow5': "#CA8500",
        'yellow4': "#FFBB33",
        'yellow3': "#FFDD99",
        'yellow2': "#FFEDCC",
        'yellow1': "#FFFAF0",
      },

      fontFamily: {
        'satisfy': ['Satisfy', 'cursive']
      },

    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
} satisfies Config