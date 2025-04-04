/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{html,ts}" // Include Angular files
    ],
    darkMode: 'class',
    theme: {
      extend: {
        keyframes: {
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(50px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
        animation: {
          fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        },
        colors:{
          'primary': '#050B20',
          'secondary': '#405FF2',
          'third': '#3D923A',
          
          'bg-1': '#F9FBFC',
          'bg-2': '#EEF1FB',
          'bg-3': '#E9F2FF',
          'bg-4': '#FFE9F3',

        },
        fontFamily: {
          DMSans: ["DM Sans", "sans-serif"],
          DMSans9pt: ["DM Sans 9pt"],
          NotoSansGeorgian: ["Noto Serif Georgian"],
          BebasNeue: ["Bebas Neue"],
        },
      },
    },
    plugins: [
      function ({ addUtilities }) {
        addUtilities({
          '.font-case': {
            'font-feature-settings': '"case" on',
          },
        })
      },
    ],
  };
  