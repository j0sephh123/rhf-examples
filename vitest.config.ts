import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      all: true,
      exclude: [
        "postcss.config.js",
        ".eslintrc.cjs",
        "tailwind.config.js",
        "src/models/types.ts",
        "src/main.tsx",
        "src/types.ts",
        "src/vite-env.d.ts",
        "src/store/libraryContext/libraryTypes.ts"
      ],
    },
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js",
  },
});
