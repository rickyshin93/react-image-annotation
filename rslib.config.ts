import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**'],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
  },
  plugins: [pluginReact()],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [
          tailwindcss({
            content: [
              './src/**/*.{html,js,ts,jsx,tsx}',
              './src/components/**/*.{js,ts,jsx,tsx,mdx}',
              './stories/**/*.{js,ts,jsx,tsx,mdx}',
            ],
            theme: {
              extend: {},
            },
            plugins: [],
          }),
        ],
      },
    },
  },
})
