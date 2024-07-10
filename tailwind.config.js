/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      primaryColor:"#4338CA",
      whiteColor:"#fff",
      borderColor:"#00000021",
      redColor:"#bb2124",
      grayColor:"#757575",
      blackColor:"#000",
     cyanColor:" #5D87B2",
      // LIGHT COLORS
      primaryColorLight:"#4763E4",
      grayColorLight:"#F3F4F6"
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow:{
        lgShadow:"0px 0px 81.7px 0px #0000002E",
        smShadow:"0px 3px 14px 0px #00000013"
      }
    },
  },
  plugins: [],
}