'use strict';

const Hapi = require('hapi');
const PORT = process.env.PORT || 8000

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: PORT
});

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler: function (request, h) {
    return 'hello world';
  }
});

// Start the server
async function start() {

  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();