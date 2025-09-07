const http = require('http');
const _ = require('lodash');
const minimist = require('minimist');

// Purposely do a lodash usage and a naive arg parse.
const args = minimist(process.argv.slice(2));
const port = args.port || 8080;

const server = http.createServer((req, res) => {
  // Vulnerable-ish pattern: trust of args and outdated libs (demo only)
  const msg = _.join(['Hello', 'from', 'vuln-node'], ' ');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(msg + '\n');
});

server.listen(port, () => console.log(`vuln-node listening on ${port}`));
