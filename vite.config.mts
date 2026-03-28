import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, "src/index.ts"),
                server: resolve(__dirname, "src/server.ts"),
                client: resolve(__dirname, "src/client.ts")
            },
            formats: ["es"]
        },
        rollupOptions: {
            external: [
                "astro",
                "linkedom",
                "@geajs/vite-plugin",
                "@geajs/core",
                "node:path",
                "node:url",
                "node:fs"
            ],
            output: {
                entryFileNames: "[name].js"
            }
        },
        minify: true,
        sourcemap: true,
        outDir: "dist",
        emptyOutDir: true
    },
    esbuild: {
        minifyWhitespace: true,
        minifyIdentifiers: true,
        minifySyntax: true
    }
});
