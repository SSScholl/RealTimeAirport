const http = require('http');

http.createServer((request, response) => {
  console.log('Requested url: ' + request.url);

  request.on('close', () => {
    if (!response.finished) {
      response.end();
      console.log('Stopped sending events.');
    }
  });
  
  if (request.url.toLowerCase() === '/events') {
    response.writeHead(200, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    setTimeout(() => {
      response.write(
        'event: flightStateUpdate\n'
      );
      response.write(
        'data: {"flight": "I768", "state": "landing"}'
      );
      response.write('\n\n');
    }, 3000);

    setTimeout(() => {
      response.write(
        'event: flightStateUpdate\n'
      );
      response.write(
        'data: {"flight": "I768", "state": "landed"}'
      );
      response.write('\n\n');
    }, 6000);

    setTimeout(() => {
      response.write(
        'event: flightRemoval\n'
      );
      response.write(
        'data: {"flight": "I768"}'
      );
      response.write('\n\n');
    }, 9000);

  } else {
    response.writeHead(404);
    response.end();
  }
}).listen(5000, () => {
  console.log('Server running at http://127.0.0.1:5000/');
});
