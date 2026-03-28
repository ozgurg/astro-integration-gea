import { defineConfig } from "astro/config";
import geaIntegration from "../../../src/index.ts";

export default defineConfig({
    integrations: [
        geaIntegration()
    ],
    outDir: "./dist"
});
