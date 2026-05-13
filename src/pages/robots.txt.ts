import type { APIRoute } from "astro";
import { withBase } from "@lib/url";

export const GET: APIRoute = ({ site }) => {
  const sitemap = site ? new URL(withBase("/sitemap-index.xml"), site).toString() : "";
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
