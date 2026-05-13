// Prepend the configured Astro `base` to an absolute app path so links work
// both locally and when deployed to a GitHub Pages subpath. Route paths are
// emitted with a trailing slash to satisfy `trailingSlash: "always"`; paths
// whose final segment contains a file extension (favicons, JSON endpoints)
// stay as-is. Hash/query suffixes (`/about/#section`, `/api/?x=1`) are
// preserved verbatim and re-attached after the slash logic runs.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const trimmedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  if (path === "" || path === "/") return `${trimmedBase}/`;
  // Split off ?query/#hash so they don't trip the extension/trailing-slash checks.
  const suffixStart = path.search(/[?#]/);
  const pathPart = suffixStart === -1 ? path : path.slice(0, suffixStart);
  const suffix = suffixStart === -1 ? "" : path.slice(suffixStart);
  const normalized = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;
  const full = `${trimmedBase}${normalized}`;
  const lastSegment = full.split("/").pop() ?? "";
  const withTrailing = lastSegment.includes(".") || full.endsWith("/") ? full : `${full}/`;
  return `${withTrailing}${suffix}`;
}
