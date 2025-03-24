/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{html,ts}" // Include Angular files
    ],
    darkMode: 'class',
    theme: {
      extend: {
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
          BebasNeue: ["Bebas Neue"],
          NotoSansGeorgian: ["Noto Serif Georgian"],
          DMSans: ["DM Sans 9pt"],
        },
        
      },
    },
    plugins: [],
  };
  