import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Ensure this is installed: `pnpm add -D babel-plugin-relay`
          ['babel-plugin-relay', { artifactDirectory: './src/graphql/__generated__' }],
        ],
      },
    }),
  ],


  test: {
    // Use jsdom so RTL can render components
    environment: "jsdom",
    // So no need to import describe/it/expect in every test
    globals: true,
    // Load our jest-dom matchers and any polyfills
    setupFiles: ["./vitest.setup.ts"],
    // Optional: make test discovery explicit
    include: ["**/*.test.{ts,tsx}"],
    // Recommended for React/JSX source maps
    css: false,
    // Nice reporter output
    reporters: ["verbose"],
  },
});

