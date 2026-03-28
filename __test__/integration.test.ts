import { build } from "astro";
import { beforeAll, describe, expect, it } from "vitest";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { existsSync, readFileSync } from "node:fs";

const fixtureRoot = fileURLToPath(new URL("./fixtures/basic/", import.meta.url));

describe("Integration tests", () => {
    beforeAll(async () => {
        // Build the basic fixture project
        await build({
            root: fixtureRoot,
            logLevel: "error"
        });
    }, 10_000); // 30s timeout for build

    it("should render Gea component on SSR with correct slots", () => {
        const htmlPath = join(fixtureRoot, "dist/index.html");
        expect(existsSync(htmlPath)).toBe(true);

        const html = readFileSync(htmlPath, "utf-8");

        // Verify component rendering (Gea uses scoped IDs like id="wkjme2")
        expect(html).toContain("Hello Test");
        expect(html).toContain("<h1");

        // Verify hydration attribute
        expect(html).toContain("ssr");

        // Verify slots
        // In SSR, slots are wrapped in `<astro-slot />`
        expect(html).toContain("<astro-slot");
        expect(html).toContain("Default Content");
        expect(html).toContain(`name="footer"`);
        expect(html).toContain("Footer Content");
    });
});
