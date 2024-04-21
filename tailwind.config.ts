import type { Config } from "tailwindcss";
const { withMaterialColors } = require("@sinskiy/tailwind-material-colors");
const config: Config = {
  safelist: [
    "interactive-bg-primary",
    "hover:interactive-bg-primary-container",
    "before:bg-primary-container",
    "before:bg-error-container",
    "text-error-container",
    "hover:text-on-error-container",
  ],
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
