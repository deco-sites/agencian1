import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { 
      center: true
    },
    colors:{
      "base-150" : "#F3F4F7",
      "base-400" : "#9B9B9B"
    },
    fontFamily:{
      'noto-sans'         : 'Noto Sans',
      'archimoto-thin'    : 'ArchimotoN1-Thin',
      'archimoto-regular' : 'ArchimotoN1-Regular',
      'archimoto-medium'  : 'ArchimotoV01-Medium',
      'archimoto-black'   : 'ArchimotoN1-Black',
    },
    fontSize:{
      12: ['12px', '22.4px'],
      14: ['14px', '19.6px'],
      16: ['16px', '22px'],
      18: ['18px', '21.6px'],
      24: ['24px', '28.8px'],
      32: ['32px', '38.4px'],
      48: ['48px', '57.6px'],

    },
    extend: {
      gridTemplateColumns:{
        '2-auto'  : 'repeat(2, auto)',
        '3-auto'  : 'repeat(3, auto)',
        '4-auto'  : 'repeat(4, auto)',
        '5-auto'  : 'repeat(5, auto)',
        '3-200'  : 'repeat(3, 200px)',
        '2-200'  : 'repeat(3, 200px)',
        '6-auto' : 'repeat(6, auto)',
      },
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%"  : { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      screens:{
        'mobile'          : {'max': '767px'},
        'tablet'          : {'min' : '768px', 'max': '1023px'},
        'portatil'        : {'min' : '1024px','max': '1280px'}
      }
    },
  },
};
