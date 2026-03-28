import type { AstroIntegration } from "astro";
import { geaPlugin } from "@geajs/vite-plugin";

export default function geaIntegration(): AstroIntegration {
    return {
        name: "astro-integration-gea",
        hooks: {
            "astro:config:setup": ({ addRenderer, updateConfig }) => {
                addRenderer({
                    name: "astro-integration-gea",
                    serverEntrypoint: "astro-integration-gea/server.js",
                    clientEntrypoint: "astro-integration-gea/client.js"
                });

                updateConfig({
                    vite: {
                        plugins: [
                            geaPlugin() as any
                        ],
                        optimizeDeps: {
                            include: ["@geajs/core"],
                            exclude: ["astro-integration-gea/server.js"]
                        }
                    }
                });
            }
        }
    };
}
