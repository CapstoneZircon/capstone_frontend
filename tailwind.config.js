const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}",
            "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {

    colors : {

      "backg-gray" : '#B2B2B2',

      "FeedButton" : '#155e75',
      "feedHome-bg" : '#E6D6C6',

      "saleNev-bg": '#8C8176',
      'saleBody-bg': '#FDFDFD',


      "order-bg" : '#8C8176',

    },

    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
 
    extend: {

    },
  },
  plugins: [],
});