import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2"
};

function resolveRequestPath(requestUrl = "/") {
  const pathname = decodeURIComponent(new URL(requestUrl, "http://127.0.0.1").pathname);
  let requested = normalize(join(root, pathname === "/" ? "index.html" : pathname));
  if (requested !== root && !requested.startsWith(`${root}${sep}`)) return null;
  if (existsSync(requested) && statSync(requested).isDirectory()) requested = join(requested, "index.html");
  return requested;
}

export function createStaticServer() {
  return createServer((request, response) => {
    const requested = resolveRequestPath(request.url);
    if (!requested || !existsSync(requested) || !statSync(requested).isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }
    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(requested).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    createReadStream(requested).pipe(response);
  });
}

export function startServer(port = Number(process.env.PORT || 4173)) {
  return new Promise((resolvePromise, reject) => {
    const server = createStaticServer();
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolvePromise(server));
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = await startServer();
  const address = server.address();
  console.log(`Defense Line preview: http://127.0.0.1:${address.port}`);
}
