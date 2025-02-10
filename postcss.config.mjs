export default {
  plugins: {
    '@tailwindcss/postcss': {
      content: [
        './src/**/*.{html,js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './stories/**/*.{js,ts,jsx,tsx,mdx}',
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    },
  },
}
