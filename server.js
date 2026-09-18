// Minimal zero-dependency static server. Railway sets PORT automatically.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'public');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

function send(res, status, body, type) {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'public, max-age=300' });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);

  // Resolve inside ROOT only.
  let target = path.normalize(path.join(ROOT, url));
  if (!target.startsWith(ROOT)) return send(res, 403, 'Forbidden', 'text/plain');

  if (url === '/' || url.endsWith('/')) target = path.join(target, 'index.html');

  // Allow extensionless pretty URLs: /contact -> /contact.html
  if (!path.extname(target) && fs.existsSync(target + '.html')) target += '.html';

  fs.readFile(target, (err, data) => {
    if (err) {
      const notFound = path.join(ROOT, '404.html');
      return fs.readFile(notFound, (e, page) =>
        e ? send(res, 404, 'Not found', 'text/plain') : send(res, 404, page, TYPES['.html'])
      );
    }
    send(res, 200, data, TYPES[path.extname(target)] || 'application/octet-stream');
  });
});

server.listen(PORT, () => console.log(`IJK site listening on :${PORT}`));
