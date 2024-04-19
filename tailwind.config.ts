import type { Config } from "tailwindcss";
const { withMaterialColors } = require("@sinskiy/tailwind-material-colors");
const config: Config = {
  safelist: ["interactive-bg-primary"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default withMaterialColors(config, {
  primary: "#446732",
});
