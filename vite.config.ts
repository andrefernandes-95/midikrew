import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

const srcPath = path.resolve(__dirname, "src");
const aliases = Object.fromEntries(
  fs
    .readdirSync(srcPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => [dirent.name, path.resolve(srcPath, dirent.name)])
);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliases,
  },
  assetsInclude: ["**/*.WAV"], // Include .WAV files as assets
});
