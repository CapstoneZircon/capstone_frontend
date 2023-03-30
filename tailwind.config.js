const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {

    colors : {

      "FeedButton" : '#155e75'

    },
 
    extend: {

    },
  },
  plugins: [],
});