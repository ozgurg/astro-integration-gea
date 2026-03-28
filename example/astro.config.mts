import { defineConfig } from "astro/config";
import geaIntegration from "astro-integration-gea";

export default defineConfig({
    integrations: [
        geaIntegration()
    ],
    vite: {
        server: {
            fs: {
                allow: [".."]
            }
        }
    }
});
