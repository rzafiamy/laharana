import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

// Remove unwanted files before building the project
const removeUnwantedFiles = () => {
  const filePath = path.resolve("./src/public/test");
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath, { recursive: true, force: true });
    console.log(`Removed: ${filePath}`);
  }
};

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../../cordova/www",
    minify: true,
    emptyOutDir: true,
  },
  plugins: [
    {
      name: "remove-unwanted-files",
      buildStart() {
        removeUnwantedFiles();
      },
    },
  ],
  server: {
    host: "0.0.0.0",
    watch: {
      usePolling: true,
    },
  },
});
