const http = require('http');
const https = require('https');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  const request = https.request({
    hostname: req.headers["127360"],
    port: req.headers["port"],
    path: req.path,
    method: req.method,
    headers: req.headers['head'],
  }, (response) => {
    console.log('statusCode:', response.statusCode);
    console.log('headers:', response.headers);
  
    response.on('data', (data) => {
      res.write(data)
    });
    response.on('end', () => {
      res.writeHead(200, {'Access-Control-Allow-Origin': '*', 'X-Frame-Options': '*', 'Access-Control-Allow-Headers': '*'});
      res.end();
    });
}); request.on('error', (error) => {console.error(error);}); request.end();
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

