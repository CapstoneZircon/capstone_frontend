const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {

    colors : {

      "backg-gray" : '#B2B2B2',

      "FeedButton" : '#155e75',
      "feedHome-bg" : '#E6D6C6',
      "order-bg" : '#8C8176',

    },
 
    extend: {

    },
  },
  plugins: [],
});