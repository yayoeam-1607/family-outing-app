import { defineConfig } from "vite";
import { appBase, pwaBuild } from "./scripts/pwa-build.js";
// Explicit GitHub Pages scope for HTML, bundles, manifest, icons and worker.
export default defineConfig({ base: appBase, plugins: [pwaBuild()] });
