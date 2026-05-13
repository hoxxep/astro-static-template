import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const sitemap = site ? new URL("/sitemap-index.xml", site).toString() : "";
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    sitemap ? `Sitemap: ${sitemap}` : "# Set `site` in astro.config.ts to populate the sitemap URL.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
