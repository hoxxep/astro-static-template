// @ts-check
import {defineConfig} from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// @ts-ignore
import astroBrokenLinksChecker from "astro-broken-link-checker";

// https://astro.build/config
export default defineConfig({
    // TODO: set this to your deployed URL — no trailing slash. The sitemap,
    // canonical links, og:image and robots.txt all read from this value.
    // Examples: "https://yourname.com" or "https://your-username.github.io/your-repo"
    site: 'https://example.com',

    compressHTML: import.meta.env.PROD,

    integrations: [
        icon(),
        sitemap(),
        astroBrokenLinksChecker({
            logFilePath: "broken-links.log",
            checkExternalLinks: process.env.CHECK_EXTERNAL_LINKS === "true",
            throwError: true, // Stop the build if broken internal links are found
        }),
    ],

    vite: {
        plugins: [
            tailwindcss(),
        ]
    },

    output: "static",
    trailingSlash: "always",
    prefetch: false,

    build: {
        inlineStylesheets: "always",
    },

    devToolbar: {
        enabled: false
    },

    server: ({command}) => ({
        port: command === "dev" ? 4321 : 4321
    }),
});
