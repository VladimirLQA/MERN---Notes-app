// import type { Config } from "tailwindcss";
// import daisyui from "daisyui";

// const config: Config = {
//     content: [
//         "./src/**/*.{js,ts,jsx,tsx,css}",
//     ],
//     theme: {
//         extend: {},
//     },
//     plugins: [daisyui],
// };

// export default config;

import "./src/index.css";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
