var http = require('http');
var urlParser = require('url');

var server = http.createServer().listen(3001);

console.log('I\'m listening on port: 3001');

server.on('request', function (request, response) {
  var urlObj = urlParser.parse(request.url); //
  var pathname = urlObj.pathname; // parsing our the important info in the url

  console.log(`requested: ${pathname}`);

  console.log(request.url);

  if (pathname == `/movies`) {
    console.log(`Inside the Movies block`);

    response.writeHead(200, {
      'Content-Type': 'text/html'
    });

    response.write('<html>Hello World!');
    response.write('<script>console.log(\'I\'m client-side JavaScript being sent via server-side JavaScript\');</script>');
    response.write('<body>');
    response.write('<h1>Movies!</h1>');
    response.write('<ul><li>Driver</li><li>Baby Driver</li></ul>');
    response.write('</body>');
    response.write('</html>');
    response.end();
  } else {

    response.writeHead(200, {
      'Content-Type': 'text/html'
    });

    response.write('<html>Hello World!');
    response.write('<script>console.log(\'I\'m client-side JavaScript being sent via server-side JavaScript\');</script>');
    response.write('</html>');
    response.end();
  }
});