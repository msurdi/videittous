/* eslint-disable global-require */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js}"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  daisyui: {
    styled: true,
    themes: ["wireframe"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("daisyui")],
};
