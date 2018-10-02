const http = require('http');

http.createServer((request, response) => {
  console.log('Requested url: ' + request.url);

  if (request.url.toLowerCase() === '/events') {
    response.writeHead(200, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    setTimeout(() => {
      response.write(
        'data: {"flight": "I768", "state": "landing"}'
      );
      response.write('\n\n');
    }, 3000);

    setTimeout(() => {
      response.write(
        'data: {"flight": "I768", "state": "landed"}'
      );
      response.write('\n\n');
    }, 6000);

  } else {
    response.writeHead(404);
    response.end();
  }
}).listen(5000, () => {
  console.log('Server running at http://127.0.0.1:5000/');
});
